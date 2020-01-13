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

allTypeToCreate["allNodeActualites"] = {
  template: path.resolve(`./src/templates/actualite.js`),
}
allTypeToCreate["allNodeArticle"] = {
  template: path.resolve(`./src/templates/article.js`),
}
allTypeToCreate["allNodeCarnetDAdresse"] = {
  template: path.resolve(`./src/templates/address.js`),
}
allTypeToCreate["allNodeEvenements"] = {
  template: path.resolve(`./src/templates/evenement.js`),
}
allTypeToCreate["allNodePage"] = {
  template: path.resolve(`./src/templates/page.js`),
}
allTypeToCreate["allNodeTeleformulaires"] = {
  template: path.resolve(`./src/templates/teleform.js`),
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  let promises = Object.entries(allTypeToCreate).map(entity => {
    let entityName = entity[0]
    let entityConf = entity[1]
    let request = requestBuilder(entityName)

    return new Promise(resolve => {
      graphql(request).then(result => {
        if (result.errors) resolve()
        if (!result.data || !(entityName in result.data)) resolve()

        // entities page creation
        const template = entityConf.template
        const nodes = result.data[entityName].edges
        nodes.forEach(({ node }) => {
          const slug = node.path.alias
          createPage({
            path: slug,
            component: template,
            context: {
              slug: slug,
            },
          })
        })

        resolve()
      })
    })
  })

  return Promise.all(promises)
}
