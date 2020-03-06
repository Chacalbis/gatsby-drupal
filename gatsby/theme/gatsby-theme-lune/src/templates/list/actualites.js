import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/Layout/layout"
import Pagination from "../../components/Pagination/pagination"
import NonStretchedImage from "../../components/Image/non-stretched-image"
import ContenuLibre from "../../components/ContenuLibre/contenu-libre"
import SummaryTransformer from "../../components/Transformers/summary-transformer"
import {
  zoneActualitesLibreBas,
  zoneActualitesLibreHaut,
  listActualitesContainer,
  actualiteDate,
  actuItem,
  actualiteInfos,
  actualiteImg,
  actualiteCategorie,
  actualiteTitle,
  actualiteResume,
} from "./styles/listActus.module.scss"

const Actu = ({ actu }) => (
  <>
    {actu.relationships.field_image_actus?.localFile?.childImageSharp
      ?.fluid && (
      <Link to={actu.path.alias}>
        <NonStretchedImage
          className={actualiteImg}
          {...actu.relationships.field_image_actus.localFile.childImageSharp}
        />
      </Link>
    )}
    <div className={actualiteInfos}>
      {actu.relationships.field_taxonomie_thematique?.length > 0 && (
        <div className={actualiteCategorie}>
          {actu.relationships.field_taxonomie_thematique[0].name}
        </div>
      )}
      <div className={actualiteDate}>posté le {actu.created}</div>
      <h2 className={actualiteTitle}>
        <Link to={actu.path.alias}>{actu.title}</Link>
      </h2>
      {actu.body && (
        <div
          className={actualiteResume}
          dangerouslySetInnerHTML={{
            __html: SummaryTransformer(actu.body, 200),
          }}
        />
      )}
    </div>
  </>
)

const RenderActualites = ({ actualiteData }) => {
  const actus = actualiteData.allNodeActualites.edges
  return (
    <>
      {actus.map(({ node }) => (
        <div key={node.drupal_id} className={actuItem}>
          <Actu actu={node} />
        </div>
      ))}
    </>
  )
}

const ActualitesTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, baseLink } = pageContext
  return (
    <Layout message="Liste des actualités">
      <section className={zoneActualitesLibreHaut}>
        <ContenuLibre zoneTaxoLibre="zone_actualites_haut" />
      </section>
      <section className={listActualitesContainer}>
        <RenderActualites actualiteData={data} />
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={baseLink}
        />
      </section>
      <section className={zoneActualitesLibreBas}>
        <ContenuLibre zoneTaxoLibre="zone_actualites_bas" />
      </section>
    </Layout>
  )
}

export default ActualitesTemplate

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allNodeActualites(
      sort: { fields: created, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          drupal_id
          created(formatString: "DD/MM/YYYY", locale: "fr")
          body {
            summary
            processed
          }
          path {
            alias
          }
          field_image_actus {
            alt
          }
          field_infos_complementaires {
            processed
          }
          relationships {
            field_taxonomie_thematique {
              name
              path {
                alias
              }
            }
            field_image_actus {
              localFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
