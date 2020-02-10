import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import ResultsTaxo from "../../components/resultsTaxo/resultsTaxo"

const TaxoTeleformulairesTemplate = ({ data, pageContext }) => {
  const teleformResults = data.allNodeTeleformulaires.edges
  return (
    <Layout>
      <ResultsTaxo pageContext={pageContext} resultats={teleformResults} />
    </Layout>
  )
}

export default TaxoTeleformulairesTemplate

export const query = graphql`
  query filteredTeleformQuery($slugTerm: String!) {
    allNodeTeleformulaires(
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
