import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import Pagination from "../../components/pagination/pagination"

const TaxoThematiquesTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, baseLink, slugTerm } = pageContext
  const mergedNodes = [
    ...data.allNodeCarnetDAdresse.edges,
    ...data.allNodeActualites.edges,
    ...data.allNodeEvenements.edges,
  ]
  return (
    <Layout>
      <div>
        <h4>{slugTerm}</h4>
        <h5>
          Page {currentPage} sur {numPages}
        </h5>
      </div>
      <div>
        {mergedNodes.map(({ node }) => {
          return <TaxoThematique node={node} />
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        contextPage={baseLink}
      />
    </Layout>
  )
}

const TaxoThematique = ({ node }) => (
  <div>
    <div>
      <h5>{node.relationships.node_type.name}</h5>
    </div>
    <Link to={node.path.alias}>
      <h5>{node.title}</h5>
      <p>{node.body?.summary}</p>
    </Link>
  </div>
)

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
          }
          path {
            alias
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
