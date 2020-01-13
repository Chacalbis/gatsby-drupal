import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NonStretchedImage from "../components/non-stretched-image"
import AdditionalInformation from "../components/additional-information"

const AddressTemplate = ({ data }) => {
  const addressBook = data.nodeCarnetDAdresse

  return (
    <Layout>
      <SEO title={addressBook.title} description={addressBook.body.summary} />
      <div key={addressBook.path.alias}>
        <TeleformHeader address={addressBook} />
        <TeleformContent address={addressBook} />
      </div>
    </Layout>
  )
}

const TeleformHeader = ({ address }) => (
  <h2>
    <Link
      to={address.path.alias}
      dangerouslySetInnerHTML={{ __html: address.title }}
    />
  </h2>
)

const TeleformContent = ({ address }) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: address.body?.processed }} />
    <TeleformContact address={address} />
    {address.relationships?.field_image_adresse?.map(image => (
      <NonStretchedImage {...image.localFile.childImageSharp} />
    ))}
    <AdditionalInformation node={address} />
  </div>
)

const TeleformContact = ({ address }) => (
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

export default AddressTemplate

export const query = graphql`
  query($slug: String!) {
    nodeCarnetDAdresse(path: { alias: { eq: $slug } }) {
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
      field_ordre_carnet_d_adresse
      field_image_adresse {
        alt
      }
      field_infos_complementaires {
        processed
      }
      relationships {
        field_image_adresse {
          localFile {
            childImageSharp {
              fluid(quality: 100) {
                src
                presentationWidth
                presentationHeight
                aspectRatio
              }
            }
          }
        }
      }
    }
  }
`
