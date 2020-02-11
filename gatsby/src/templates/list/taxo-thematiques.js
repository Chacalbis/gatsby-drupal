import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import ResultsTaxo from "../../components/resultsTaxo/resultsTaxo"

const TaxoThematiquesTemplate = ({ data, pageContext }) => {
  const { skip, limit } = pageContext
  const mergedNodes = [
    ...data.allNodeCarnetDAdresse.edges,
    ...data.allNodeActualites.edges,
    ...data.allNodeEvenements.edges,
  ]
  const filteredNodes = mergedNodes.slice(skip, skip + limit)
  return (
    <Layout message="Résultats">
      <ResultsTaxo pageContext={pageContext} resultats={filteredNodes} />
    </Layout>
  )
}

export default TaxoThematiquesTemplate

export const query = graphql`
  query contentFilteredQuery($slugTerm: String!) {
    allNodeCarnetDAdresse(
      sort: { fields: field_ordre_carnet_d_adresse }
      filter: {
        relationships: {
          field_taxonomie_thematique: { elemMatch: { name: { eq: $slugTerm } } }
        }
      }
    ) {
      edges {
        node {
          title
          body {
            summary
            processed
          }
          path {
            alias
          }
          field_numero
          field_voie
          field_code_postal
          field_ville
          field_mail
          field_telephone
          internal {
            type
          }
          relationships {
            node_type {
              name
            }
          }
        }
      }
    }
    allNodeActualites(
      sort: { fields: created }
      filter: {
        relationships: {
          field_taxonomie_thematique: { elemMatch: { name: { eq: $slugTerm } } }
        }
      }
    ) {
      edges {
        node {
          title
          body {
            summary
            processed
          }
          path {
            alias
          }
          internal {
            type
          }
          relationships {
            node_type {
              name
            }
          }
        }
      }
    }
    allNodeEvenements(
      sort: { fields: created }
      filter: {
        relationships: {
          field_taxonomie_thematique: { elemMatch: { name: { eq: $slugTerm } } }
        }
      }
    ) {
      edges {
        node {
          title
          body {
            summary
            processed
          }
          path {
            alias
          }
          field_date_de_debut(
            locale: "fr"
            formatString: "DD MMMM YYYY, h:mm a"
          )
          field_date_de_fin(locale: "fr", formatString: "DD MMMM YYYY, h:mm a")
          field_url_lieu {
            title
            uri
          }
          internal {
            type
          }
          relationships {
            node_type {
              name
            }
          }
        }
      }
    }
  }
`
