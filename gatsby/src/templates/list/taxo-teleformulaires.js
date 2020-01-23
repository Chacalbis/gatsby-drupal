import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import Pagination from "../../components/pagination/pagination"

const TaxoTeleformulairesTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, baseLink, slugTerm } = pageContext
  return (
    <Layout>
      <div>
        <h4>{slugTerm}</h4>
        <h5>
          Page {currentPage} sur {numPages}
        </h5>
      </div>
      <div>
        {data.allNodeTeleformulaires.edges.map(({ node }) => {
          return <TaxoTeleform node={node} />
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

const TaxoTeleform = ({ node }) => (
  <div>
    <Link to={node.path.alias}>
      <h5>{node.title}</h5>
    </Link>
    <Links teleform={node} />
  </div>
)

const Links = ({ teleform }) => {
  return teleform.field_lien_demarches_simplifiees.map(link => {
    return (
      <div>
        <Link to={link.uri}>{link.title}</Link>
      </div>
    )
  })
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
        }
      }
    }
  }
`
