import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import {
  zoneLibre,
  zoneLibreTitle,
  zoneLibreIndex,
} from "../styles/contenuLibre.module.scss"
import ContentTransformer from "./content-transformer"
import Teleformulaire from "./teleformulaire/teleformulaire"

const ContenuLibre = ({ zoneTaxoLibre, isIndex }) => {
  const data = useStaticQuery(graphql`
    query ContenuLibreQuery {
      allNodeContenuLibre(sort: { fields: created, order: DESC }) {
        edges {
          node {
            created(formatString: "YYYY/MM/DD", locale: "en")
            body {
              processed
            }
            internal {
              type
            }
            title
            relationships {
              field_taxonomie_zone_libre {
                name
              }
            }
          }
        }
      }
      allNodeTeleformulaires(sort: { fields: created, order: DESC }) {
        edges {
          node {
            title
            created(formatString: "YYYY/MM/DD", locale: "en")
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
            internal {
              type
            }
            relationships {
              field_taxonomie_zone_libre {
                name
              }
              field_taxonomie_teleformulaire {
                name
                path {
                  alias
                }
              }
            }
          }
        }
      }
    }
  `)
  const contenusLibre = data.allNodeContenuLibre.edges
  const teleformulaires = data.allNodeTeleformulaires.edges
  const resultTeleform = teleformulaires
    .filter(
      ({ node }) =>
        node.relationships?.field_taxonomie_zone_libre?.name === zoneTaxoLibre
    )
    .shift()
  const resultContenuLibre = contenusLibre
    .filter(
      ({ node }) =>
        node.relationships?.field_taxonomie_zone_libre?.name === zoneTaxoLibre
    )
    .shift()
  const bothNodes = [resultTeleform, resultContenuLibre]
  const result = bothNodes
    .sort((a, b) => {
      if (a.node.created > b.node.created) return -1
      if (a.node.created < b.node.created) return 1
      return 0
    })
    .shift()
  if (!result) return null
  if (result.node.internal.type === "node__contenu_libre") {
    return (
      <div className={isIndex ? zoneLibreIndex : zoneLibre}>
        <h2 className={zoneLibreTitle}>{result.node.title}</h2>
        <ContentTransformer content={result.node.body?.processed} />
      </div>
    )
  } else {
    return (
      <div className={isIndex ? zoneLibreIndex : zoneLibre}>
        <Teleformulaire zoneLibre={true} teleformulaire={result.node} />
      </div>
    )
  }
}

export default ContenuLibre
