const path = require(`path`)

// Add a fomatted date field respecting GMT+1 timezone
const moment = require("moment-timezone")
async function onCreateNode({ node, actions: { createNodeField } }) {
  if (node.internal.type === `node__article` && node.created) {
    const createdMoment = moment(node.created).tz("Europe/Paris")
    createNodeField({
      node,
      name: "slug_date",
      value: createdMoment.locale("fr-FR").format("dddd DD/MM/YYYY - HH:mm"),
    })
  }
  return
}
exports.onCreateNode = onCreateNode

let allTypeToCreate = {}

allTypeToCreate["allNodeActualites"] = {
  detailTemplate: path.resolve(`./src/templates/details/actualite.js`),
  listTemplate: path.resolve(`./src/templates/list/actualites.js`),
  nodesPerPage: 5,
  baseLink: "actu",
}
allTypeToCreate["allNodeArticle"] = {
  detailTemplate: path.resolve(`./src/templates/details/article.js`),
}
allTypeToCreate["allNodeCarnetDAdresse"] = {
  detailTemplate: path.resolve(`./src/templates/details/adresse.js`),
  listTemplate: path.resolve(`./src/templates/list/adresses.js`),
  nodesPerPage: 8,
  baseLink: "address",
}
allTypeToCreate["allNodeEvenements"] = {
  detailTemplate: path.resolve(`./src/templates/details/evenement.js`),
  listTemplate: path.resolve(`./src/templates/list/evenements.js`),
  nodesPerPage: 6,
  baseLink: "event",
}
allTypeToCreate["allNodePage"] = {
  detailTemplate: path.resolve(`./src/templates/details/page.js`),
  listTemplate: path.resolve(`./src/templates/list/pages.js`),
  nodesPerPage: 10,
  baseLink: "page",
}
allTypeToCreate["allNodeTeleformulaires"] = {
  detailTemplate: path.resolve(`./src/templates/details/teleform.js`),
}

const requestBuilder = name => {
  return `{
    ${name} {
      edges {
        node {
          title
          path {
            alias
          }
        }
      }
    }
  }`
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  let promises = Object.entries(allTypeToCreate).map(entity => {
    let entityName = entity[0]
    let entityConf = entity[1]
    let request = requestBuilder(entityName)

    return new Promise(resolve => {
      graphql(request).then(result => {
        if (result.errors) throw result.errors
        if (!result.data || !(entityName in result.data)) resolve()

        // entities details page creation
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

        // Creating entities list with pagination
        if (result.data[entityName] && entityConf.listTemplate) {
          const entitiesWithoutFeatured = result.data[entityName].edges.filter(
            ({ node }) => {
              return !node.relationships
            }
          )
          const perPage = entityConf.nodesPerPage
          const numPages = Math.ceil(entitiesWithoutFeatured.length / perPage)
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

  return Promise.all(promises)
}
