import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import AdditionalInformation from "../../components/additional-information"
import ContentTransformer from "../../components/content-transformer"
import {
  pageAddress,
  pageAddressAdditionalInfos,
  addressContent,
  addressContentContainer,
  addressTitle,
  addressAddress,
  addressVoie,
  addressCompAddress,
  addressVille,
  separator,
  addressBody,
  addressContact,
  addressMail,
  addressTel,
  addressFooter,
  addressFooterBack,
} from "../../styles/detailsAddress.module.scss"
import Carousel from "../../components/carousel/carousel"

const AddressContent = ({ address }) => (
  <div className={addressContent}>
    <article className={addressContentContainer}>
      <p className={addressTitle}>{address.title}</p>
      <div className={addressAddress}>
        <div className={addressVoie}>
          {address.field_numero} {address.field_voie}
        </div>
        {address.field_complement_d_adresse && (
          <div className={addressCompAddress}>
            {address.field_complement_d_adresse}
          </div>
        )}
        <div className={addressVille}>
          {address.field_code_postal} {address.field_ville}
        </div>
      </div>
      <AddressContact address={address} />
    </article>
    <hr className={separator}></hr>
    <div className={addressBody}>
      <ContentTransformer content={address.body?.processed} />
    </div>
  </div>
)

const AddressContact = ({ address }) => {
  const mail = `mailto:${address.field_mail}`
  const tel = `tel:${address.field_telephone}`
  return (
    <>
      {address.field_mail && address.field_telephone && (
        <div className={addressContact}>
          {address.field_mail && (
            <p className={addressMail}>
              <Link to={mail}>{address.field_mail}</Link>
            </p>
          )}
          {address.field_telephone && (
            <p className={addressTel}>
              <Link to={tel}>{address.field_telephone}</Link>
            </p>
          )}
        </div>
      )}
    </>
  )
}

const AddressFooter = () => (
  <div className={addressFooter}>
    <div className={addressFooterBack}>
      <Link to="../adresses">Retour à la liste des carnets d'adresses</Link>
    </div>
  </div>
)

const AddressInfos = ({ address }) => (
  <>
    {address.field_infos_complementaires && (
      <section className={pageAddressAdditionalInfos}>
        <AdditionalInformation node={address} />
      </section>
    )}
  </>
)

const AdresseTemplate = ({ data }) => {
  const addressBook = data.nodeCarnetDAdresse
  return (
    <Layout>
      <SEO title={addressBook.title} description={addressBook.body?.summary} />
      <section className={pageAddress}>
        <AddressContent address={addressBook} />
        <Carousel address={addressBook} />
        <AddressFooter />
      </section>
      <AddressInfos address={addressBook} />
    </Layout>
  )
}

export default AdresseTemplate

export const query = graphql`
  query($slug: String!) {
    nodeCarnetDAdresse(path: { alias: { eq: $slug } }) {
      title
      body {
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
      field_infos_complementaires {
        processed
      }
      relationships {
        field_image_adresse {
          localFile {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
                originalName
              }
            }
          }
        }
      }
    }
  }
`
