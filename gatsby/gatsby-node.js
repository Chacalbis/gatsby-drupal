const path = require(`path`)

let allTypeToCreate = {}
let allTaxoToCreate = {}

allTypeToCreate["allNodeActualites"] = {
  detailTemplate: path.resolve(`./src/templates/details/actualite.js`),
  listTemplate: path.resolve(`./src/templates/list/actualites.js`),
  nodesPerPage: 5,
  baseLink: "actualites",
}
allTypeToCreate["allNodeCarnetDAdresse"] = {
  detailTemplate: path.resolve(`./src/templates/details/adresse.js`),
  listTemplate: path.resolve(`./src/templates/list/adresses.js`),
  nodesPerPage: 8,
  baseLink: "adresses",
}
allTypeToCreate["allNodeEvenements"] = {
  detailTemplate: path.resolve(`./src/templates/details/evenement.js`),
  listTemplate: path.resolve(`./src/templates/list/evenements.js`),
  nodesPerPage: 6,
  baseLink: "evenements",
}
allTypeToCreate["allNodePage"] = {
  detailTemplate: path.resolve(`./src/templates/details/page.js`),
  listTemplate: path.resolve(`./src/templates/list/pages.js`),
  nodesPerPage: 10,
  baseLink: "pages",
}
allTypeToCreate["allNodeTeleformulaires"] = {
  detailTemplate: path.resolve(`./src/templates/details/teleform.js`),
}

allTaxoToCreate["allTaxonomyTermThematiques"] = {
  listTemplate: path.resolve(`./src/templates/list/taxo-thematiques.js`),
  nodesPerPage: 5,
}
allTaxoToCreate["allTaxonomyTermTeleformulaires"] = {
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
  let typePromises = Object.entries(allTypeToCreate).map(entity => {
    let entityName = entity[0]
    let entityConf = entity[1]
    let request = typeRequestBuilder(entityName)

    return new Promise(resolve => {
      graphql(request).then(result => {
        if (result.errors) throw result.errors
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

  let taxoPromises = Object.entries(allTaxoToCreate).map(entity => {
    let entityName = entity[0]
    let entityConf = entity[1]
    let request = taxoRequestBuilder(entityName)

    return new Promise(resolve => {
      graphql(request).then(result => {
        if (result.errors) throw result.errors
        if (!result.data || !(entityName in result.data)) resolve()
        result.data[entityName].edges.forEach(({ node }) => {
          let slugTerm = node.name
          switch (entityName) {
            case "allTaxonomyTermThematiques":
              request = thematiqueRequestBuilder(slugTerm)
              break
            case "allTaxonomyTermTeleformulaires":
              request = teleformRequestBuilder(slugTerm)
              break
          }

          return new Promise(resolve => {
            graphql(request).then(result => {
              if (result.errors) throw result.errors
              const perPage = entityConf.nodesPerPage
              let allNodes = []
              switch (entityName) {
                case "allTaxonomyTermThematiques":
                  allNodes = [
                    ...result.data.allNodeCarnetDAdresse.edges,
                    ...result.data.allNodeActualites.edges,
                    ...result.data.allNodeEvenements.edges,
                  ]
                  break
                case "allTaxonomyTermTeleformulaires":
                  allNodes = [...result.data.allNodeTeleformulaires.edges]
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

              resolve()
            })
          })
        })

        resolve()
      })
    })
  })
  return Promise.all([typePromises, taxoPromises])
}
