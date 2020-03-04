import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/Layout/layout"
import ResultsTaxo from "../../components/ResultsTaxo/results-taxo"

const TaxoTeleformulairesTemplate = ({ data, pageContext }) => {
  const teleformResults = data.allNodeTeleformulaires.edges
  return (
    <Layout message="Résultats">
      <ResultsTaxo pageContext={pageContext} resultats={teleformResults} />
    </Layout>
  )
}

export default TaxoTeleformulairesTemplate

export const query = graphql`
  query filteredTeleformQuery($slugTerm: String!, $limit: Int!, $skip: Int!) {
    allNodeTeleformulaires(
      limit: $limit
      skip: $skip
      filter: {
        relationships: {
          field_taxonomie_teleformulaire: {
            elemMatch: { name: { eq: $slugTerm } }
          }
        }
      }
    ) {
      edges {
        node {
          title
          drupal_id
          body {
            summary
            processed
          }
          path {
            alias
          }
          field_lien_demarches_simplifiees {
            title
            uri
          }
          relationships {
            node_type {
              name
            }
          }
          internal {
            type
          }
        }
      }
    }
  }
`
