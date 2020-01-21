import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { zoneLibre, zoneLibreTitle } from "../styles/contenuLibre.module.scss"
import ContentTransformer from "../components/content-transformer"

const ContenuLibre = ({ zoneTaxoLibre }) => {
  const data = useStaticQuery(graphql`
    query ContenuLibreQuery {
      allNodeContenuLibre(sort: { fields: created, order: DESC }) {
        edges {
          node {
            body {
              processed
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
    }
  `)
  const contenusLibre = data.allNodeContenuLibre.edges
  const result = contenusLibre
    .filter(
      ({ node }) =>
        node.relationships?.field_taxonomie_zone_libre?.name === zoneTaxoLibre
    )
    .shift()
  return (
    <>
      {result && (
        <div className={zoneLibre}>
          <h2 className={zoneLibreTitle}>{result.node.title}</h2>
          <ContentTransformer content={result.node.body?.processed} />
        </div>
      )}
    </>
  )
}

export default ContenuLibre
