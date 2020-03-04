const path = require(`path`)
const axios = require("axios")
const { createContentDigest } = require('gatsby-core-utils')

exports.sourceNodes = async ({ actions: { createNode } }) => {
  // Add random string at the end of the route to force data reloading
  const randomToken = Math.random().toString(36).slice(2)
  const url = process.env.API_REQUEST + "?" + randomToken
  const options = {
    method: "GET",
    headers: [
      { key: "Content-Type", value: "application/json" },
      { key: "Cache-Control", value: "no-cache" },
    ],
    url,
  }
  // await for results
  const res = await axios(options)

  const confNode = {
    // Required fields
    id: `0`,
    parent: `__SOURCE__`,
    internal: {
      type: `GatsbyBuildConfiguration`, // name of the graphQL query
    },
    children: [],
  }
  // map into these results and add it to confNode
  Object.entries(res.data).map((data, i) => {
    const name = data[0]
    const value = data[1]
    // Other fields we want to query with graphQl
    confNode[name] = value
  })

  // Use createContentDigest helper to generate the digest for the content of this node (required field).
  // Helps Gatsby avoid doing extra work on data that hasn’t changed.
  const contentDigest = createContentDigest(confNode)
  confNode.internal.contentDigest = contentDigest

  // Create node with the gatsby createNode() API
  createNode(confNode)
}

// Add formatted date fields respecting GMT+1 timezone
const moment = require("moment-timezone")
async function onCreateNode({ node, actions: { createNodeField } }) {
  if (node.internal.type === `node__evenements`) {
    if (node.field_date_de_debut) {
      const startMoment = moment(node.field_date_de_debut).tz("Europe/Paris")
      createNodeField({
        node,
        name: `formatted_field_date_de_debut`,
        value: startMoment.locale("fr-FR").format("DD/MM/YY à HH:mm"),
      })
    }
    if (node.field_date_de_fin) {
      const endMoment = moment(node.field_date_de_fin).tz("Europe/Paris")
      createNodeField({
        node,
        name: `formatted_field_date_de_fin`,
        value: endMoment.locale("fr-FR").format("DD/MM/YY à HH:mm"),
      })
    }
  }
}
exports.onCreateNode = onCreateNode

const allTypeToCreate = {}
const allTaxoToCreate = {}

allTypeToCreate.allNodeActualites = {
  detailTemplate: path.resolve(`./src/templates/details/actualite.js`),
  listTemplate: path.resolve(`./src/templates/list/actualites.js`),
  nodesPerPage: 5,
  baseLink: "actualites",
}
allTypeToCreate.allNodeCarnetDAdresse = {
  detailTemplate: path.resolve(`./src/templates/details/adresse.js`),
  listTemplate: path.resolve(`./src/templates/list/adresses.js`),
  nodesPerPage: 8,
  baseLink: "adresses",
}
allTypeToCreate.allNodeEvenements = {
  detailTemplate: path.resolve(`./src/templates/details/evenement.js`),
  listTemplate: path.resolve(`./src/templates/list/evenements.js`),
  nodesPerPage: 6,
  baseLink: "evenements",
}
allTypeToCreate.allNodePage = {
  detailTemplate: path.resolve(`./src/templates/details/page.js`),
  listTemplate: path.resolve(`./src/templates/list/pages.js`),
  nodesPerPage: 10,
  baseLink: "pages",
}
allTypeToCreate.allNodeTeleformulaires = {
  detailTemplate: path.resolve(`./src/templates/details/teleform.js`),
}

allTaxoToCreate.allTaxonomyTermThematiques = {
  listTemplate: path.resolve(`./src/templates/list/taxo-thematiques.js`),
  nodesPerPage: 5,
}
allTaxoToCreate.allTaxonomyTermTeleformulaires = {
  listTemplate: path.resolve(`./src/templates/list/taxo-teleformulaires.js`),
  nodesPerPage: 5,
}

const typeRequestBuilder = name => {
  return `{
    ${name} {
      edges {
        node {
          path {
            alias
          }
        }
      }
    }
  }`
}

const taxoRequestBuilder = name => {
  return `{
    ${name} {
      edges {
        node {
          name
          drupal_internal__tid
          path {
            alias
          }
        }
      }
    }
  }`
}
const thematiqueRequestBuilder = term => {
  return `{
    allNodeCarnetDAdresse(filter: {relationships: {field_taxonomie_thematique: {elemMatch: {name: {eq: "${term}"}}}}}) {
      edges {
        node {
          id
        }
      }
    }
    allNodeActualites(filter: {relationships: {field_taxonomie_thematique: {elemMatch: {name: {eq: "${term}"}}}}}) {
      edges {
        node {
          id
        }
      }
    }
    allNodeEvenements(filter: {relationships: {field_taxonomie_thematique: {elemMatch: {name: {eq: "${term}"}}}}}) {
      edges {
        node {
          id
        }
      }
    }
  }`
}
const teleformRequestBuilder = term => {
  return `{
    allNodeTeleformulaires(filter: {relationships: {field_taxonomie_teleformulaire: {elemMatch: {name: {eq: "${term}" }}}}}) {
      edges {
        node {
          id
        }
      }
    }
  }`
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const typePromises = Object.entries(allTypeToCreate).map(entity => {
    const entityName = entity[0]
    const entityConf = entity[1]
    const request = typeRequestBuilder(entityName)

    return new Promise((resolve, reject) => {
      graphql(request).then(result => {
        if (result.errors) reject(result.errors)
        if (!result.data || !(entityName in result.data)) resolve()

        // types details page creation
        if (entityConf.detailTemplate) {
          result.data[entityName].edges.forEach(({ node }) => {
            const slug = node.path.alias
            createPage({
              path: slug,
              component: entityConf.detailTemplate,
              context: {
                slug: slug,
              },
            })
          })
        }

        // Creating types list with pagination
        if (entityConf.listTemplate) {
          const perPage = entityConf.nodesPerPage
          const numPages = Math.ceil(
            result.data[entityName].edges.length / perPage
          )
          Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
              path:
                i === 0
                  ? entityConf.baseLink
                  : `/${entityConf.baseLink}/page/${i + 1}`,
              component: entityConf.listTemplate,
              context: {
                limit: perPage,
                skip: i * perPage,
                currentPage: i + 1,
                numPages,
                baseLink: entityConf.baseLink,
              },
            })
          })
        }

        resolve()
      })
    })
  })

  const taxoPromises = Object.entries(allTaxoToCreate).map(entity => {
    const entityName = entity[0]
    const entityConf = entity[1]
    let request = taxoRequestBuilder(entityName)

    // graphql already returns a promise
    // so we can use that instead of creating our own Promise instance
    return graphql(request).then(result => {
      if (result.errors) Promise.reject(result.errors)
      if (!result.data || !(entityName in result.data)) Promise.resolve()
      return Promise.all(
        result.data[entityName].edges.map(({ node }) => {
          const slugTerm = node.name
          switch (entityName) {
            case "allTaxonomyTermThematiques":
              request = thematiqueRequestBuilder(slugTerm)
              break
            case "allTaxonomyTermTeleformulaires":
              request = teleformRequestBuilder(slugTerm)
              break
          }

          return graphql(request).then(matchingContentResult => {
            if (matchingContentResult.errors) throw matchingContentResult.errors
            const perPage = entityConf.nodesPerPage
            let allNodes = []
            switch (entityName) {
              case "allTaxonomyTermThematiques":
                allNodes = [
                  ...matchingContentResult.data.allNodeCarnetDAdresse.edges,
                  ...matchingContentResult.data.allNodeActualites.edges,
                  ...matchingContentResult.data.allNodeEvenements.edges,
                ]
                break
              case "allTaxonomyTermTeleformulaires":
                allNodes = [
                  ...matchingContentResult.data.allNodeTeleformulaires.edges,
                ]
                break
            }
            const numPages = Math.ceil(allNodes.length / perPage)
            const baseLink =
              node.path.alias || `/taxonomy/term/${node.drupal_internal__tid}`
            // Creating taxo list with pagination
            Array.from({ length: numPages }).forEach((_, i) => {
              createPage({
                path: i === 0 ? baseLink : `${baseLink}/page/${i + 1}`,
                component: entityConf.listTemplate,
                context: {
                  limit: perPage,
                  skip: i * perPage,
                  currentPage: i + 1,
                  numPages,
                  baseLink: baseLink,
                  slugTerm: slugTerm,
                  nodesLength: allNodes.length,
                },
              })
            })
          })
        })
      )
    })
  })
  return Promise.all([typePromises, taxoPromises])
}
