// load .env files
require("dotenv").config()

module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `http://ternum_bfc_generateur.docker.localhost:8080`,
        apiBase: `jsonapi`, // endpoint of Drupal server
      },
    },
    {
      resolve: "gatsby-plugin-lunr",
      options: {
        languages: [{ name: "fr" }],
        fields: [
          { name: "title", store: true, attributes: { boost: 10 } },
          { name: "processed", store: true, attributes: { boost: 2 } },
          { name: "type", store: true },
          { name: "typeName", store: true, attributes: { boost: 5 } },
          { name: "url", store: true, attributes: { boost: 1 } },
          { name: "taxo", store: true, attributes: { boost: 5 } },
          { name: "ville", store: true, attributes: { boost: 3 } },
          { name: "voie", store: true, attributes: { boost: 3 } },
          { name: "codePostal", store: true, attributes: { boost: 3 } },
        ],
        resolvers: {
          node__carnet_d_adresse: {
            title: node => node.title,
            processed: node => {
              if (node.body) {
                return node.body.processed
              }
            },
            type: node => node.internal.type,
            typeName: node => "carnet d'adresse",
            url: node => node.path.alias,
            ville: node => node.field_ville,
            voie: node => node.field_voie,
            taxo: node => {
              if (
                node.__gatsby_resolved &&
                node.__gatsby_resolved.relationships &&
                node.__gatsby_resolved.relationships.field_taxonomie_thematique
              ) {
                let tabTaxo = []
                let taxos =
                  node.__gatsby_resolved.relationships
                    .field_taxonomie_thematique
                taxos.map(element => {
                  tabTaxo.push(element.name)
                })
                return tabTaxo
              }
            },
            codePostal: node => node.field_code_postal,
          },
          node__actualites: {
            title: node => node.title,
            processed: node => {
              if (node.body) {
                return node.body.processed
              }
            },
            type: node => node.internal.type,
            typeName: node => "actualites",
            url: node => node.path.alias,
            taxo: node => {
              if (
                node.__gatsby_resolved &&
                node.__gatsby_resolved.relationships &&
                node.__gatsby_resolved.relationships.field_taxonomie_thematique
              ) {
                let tabTaxo = []
                let taxos =
                  node.__gatsby_resolved.relationships
                    .field_taxonomie_thematique
                taxos.map(element => {
                  tabTaxo.push(element.name)
                })
                return tabTaxo
              }
            },
          },
          node__evenements: {
            title: node => node.title,
            processed: node => {
              if (node.body) {
                return node.body.processed
              }
            },
            type: node => node.internal.type,
            typeName: node => "evenements",
            url: node => node.path.alias,
            taxo: node => {
              if (
                node.__gatsby_resolved &&
                node.__gatsby_resolved.relationships &&
                node.__gatsby_resolved.relationships.field_taxonomie_thematique
              ) {
                let tabTaxo = []
                let taxos =
                  node.__gatsby_resolved.relationships
                    .field_taxonomie_thematique
                taxos.map(element => {
                  tabTaxo.push(element.name)
                })
                return tabTaxo
              }
            },
          },
          node__page: {
            title: node => node.title,
            processed: node => {
              if (node.body) {
                return node.body.processed
              }
            },
            type: node => node.internal.type,
            typeName: node => "page de base",
            url: node => node.path.alias,
          },
          node__teleformulaires: {
            title: node => node.title,
            processed: node => {
              if (node.body) {
                return node.body.processed
              }
            },
            type: node => node.internal.type,
            typeName: node => "teleformulaires",
            url: node => node.path.alias,
            taxo: node => {
              if (
                node.__gatsby_resolved &&
                node.__gatsby_resolved.relationships &&
                node.__gatsby_resolved.relationships
                  .field_taxonomie_teleformulaire
              ) {
                let tabTaxo = []
                let taxos =
                  node.__gatsby_resolved.relationships
                    .field_taxonomie_teleformulaire
                taxos.map(element => {
                  tabTaxo.push(element.name)
                })
                return tabTaxo
              }
            },
          },
          node__contenu_libre: {
            title: node => node.title,
            processed: node => {
              if (node.body) {
                return node.body.processed
              }
            },
            type: node => node.internal.type,
            typeName: node => "contenu libre",
            url: node => node.path.alias,
          },
        },
        filename: "search_index.json",
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "graphqlData",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "graphqlData",
        // Url to query from
        url: "http://ternum_bfc_generateur.docker.localhost:8080/graphql/",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    "@bumped-inc/gatsby-plugin-optional-chaining",
  ],
}
