import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/Layout/layout"
import Pagination from "../../components/Pagination/pagination"
import ContenuLibre from "../../components/ContenuLibre/contenu-libre"
import {
  zoneAdressesLibreBas,
  zoneAdressesLibreHaut,
  listAdressesContainer,
  adressesContainer,
  adressItem,
  adressItemAdress,
  adressItemCompAdress,
  adressItemVoie,
  adressItemName,
  adressItemTitle,
  adressItemContacts,
  adressItemTel,
  adressItemMail,
  adressMore,
} from "./styles/listAdresses.module.scss"

const AdresseInfos = ({ adress }) => (
  <Link className={adressItemName} to={adress.path.alias}>
    <p className={adressItemTitle}>{adress.title}</p>
    <div className={adressItemAdress}>
      <div className={adressItemVoie}>
        {adress.field_numero} {adress.field_voie}
      </div>
      {adress.field_complement_d_adresse && (
        <div className={adressItemCompAdress}>
          {adress.field_complement_d_adresse}
        </div>
      )}
      <div>
        {adress.field_code_postal} {adress.field_ville}
      </div>
    </div>
  </Link>
)

const AdresseContact = ({ adress }) => (
  <>
    <div className={adressItemContacts}>
      {adress.field_mail && (
        <p className={adressItemMail}>{adress.field_mail}</p>
      )}
      {adress.field_telephone && (
        <p className={adressItemTel}>{adress.field_telephone}</p>
      )}
    </div>
    <Link className={adressMore} to={adress.path.alias}>
      Plus d'infos
    </Link>
  </>
)

const RenderAdresses = ({ adressesData }) => {
  const adresses = adressesData.allNodeCarnetDAdresse.edges
  return (
    <>
      {adresses.map(({ node }) => (
        <div key={node.drupal_id} className={adressItem}>
          <AdresseInfos adress={node} />
          <AdresseContact adress={node} />
        </div>
      ))}
    </>
  )
}

const AdressesTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, baseLink } = pageContext
  return (
    <Layout message="Liste des carnets d'adresses">
      <section className={zoneAdressesLibreHaut}>
        <ContenuLibre zoneTaxoLibre="zone_carnet_d_adresse_haut" />
      </section>
      <section className={listAdressesContainer}>
        <div className={adressesContainer}>
          <RenderAdresses adressesData={data} />
        </div>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={baseLink}
        />
      </section>
      <section className={zoneAdressesLibreBas}>
        <ContenuLibre zoneTaxoLibre="zone_carnet_d_adresse_bas" />
      </section>
    </Layout>
  )
}

export default AdressesTemplate

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
          drupal_id
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
