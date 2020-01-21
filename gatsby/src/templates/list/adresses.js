import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import Pagination from "../../components/pagination/pagination"

const AddressesTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, baseLink } = pageContext
  return (
    <Layout>
      <div>
        <h5>
          Page {currentPage} sur {numPages}
        </h5>
      </div>
      <div>
        {data.allNodeCarnetDAdresse.edges.map(({ node }) => {
          return (
            <div>
              <AddressHeader address={node} />
              <AddressContent address={node} />
            </div>
          )
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

const AddressHeader = ({ address }) => (
  <h2>
    <Link
      to={address.path.alias}
      dangerouslySetInnerHTML={{ __html: address.title }}
    />
  </h2>
)

const AddressContent = ({ address }) => (
  <ul>
    <li>
      {address.field_numero} {address.field_voie}
    </li>
    <li>{address.field_complement_d_adresse}</li>
    <li>
      {address.field_code_postal} {address.field_ville}
    </li>
    <li>{address.field_mail}</li>
    <li>{address.field_telephone}</li>
  </ul>
)

export default AddressesTemplate

export const query = graphql`
  query addressesListQuery($skip: Int!, $limit: Int!) {
    allNodeCarnetDAdresse(
      sort: { fields: field_ordre_carnet_d_adresse }
      limit: $limit
      skip: $skip
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
          field_complement_d_adresse
          field_code_postal
          field_ville
          field_mail
          field_telephone
          field_image_adresse {
            alt
          }
        }
      }
    }
  }
`
