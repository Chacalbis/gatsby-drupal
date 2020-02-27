import { Link, graphql, useStaticQuery } from "gatsby"
import React from "react"
import {
  listAdressesContainer,
  listAdressesTitle,
  adressesContainer,
  allAdresses,
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
} from "../styles/carnetAdresse.module.scss"

const AdresseInfos = ({ adress }) => (
  <Link className={adressItemName} to={adress.path.alias}>
    <h3 className={adressItemTitle}>{adress.title}</h3>
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
        <div className={adressItem}>
          <AdresseInfos adress={node} />
          <AdresseContact adress={node} />
        </div>
      ))}
    </>
  )
}

const CarnetAdresse = () => {
  const data = useStaticQuery(graphql`
    query ListAdressesQuery {
      allNodeCarnetDAdresse(
        sort: { fields: field_ordre_carnet_d_adresse, order: DESC }
      ) {
        edges {
          node {
            title
            path {
              alias
            }
            field_code_postal
            field_complement_d_adresse
            field_mail
            field_numero
            field_ordre_carnet_d_adresse
            field_telephone
            field_ville
            field_voie
          }
        }
      }
      taxonomyTermZoneDefinie(name: { eq: "carnet_d_adresse" }) {
        field_label
      }
    }
  `)
  return (
    <div className={listAdressesContainer}>
      <h2 className={listAdressesTitle}>
        {data.taxonomyTermZoneDefinie.field_label || "Carnet d'adresses"}
      </h2>
      <div className={adressesContainer}>
        <RenderAdresses adressesData={data} />
      </div>
      <div className={allAdresses}>
        <Link className="btn" to="/adresses">
          Voir le carnet complet
        </Link>
      </div>
    </div>
  )
}

export default CarnetAdresse
