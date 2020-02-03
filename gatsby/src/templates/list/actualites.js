import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import Pagination from "../../components/pagination/pagination"
import NonStretchedImage from "../../components/non-stretched-image"
import ContenuLibre from "../../components/contenuLibre"
import SummaryTransformer from "../../components/summary-transformer"
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
} from "../../styles/listActus.module.scss"

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
      {actu.relationships.field_taxonomie_thematique && (
        <div className={actualiteCategorie}>
          {actu.relationships.field_taxonomie_thematique[0].name}
        </div>
      )}
      <div className={actualiteDate}>posté le {actu.created}</div>
      <div className={actualiteTitle}>
        <Link to={actu.path.alias}>{actu.title}</Link>
      </div>
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
        <div className={actuItem}>
          <Actu actu={node} />
        </div>
      ))}
    </>
  )
}

const ActualitesTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, baseLink } = pageContext
  return (
    <Layout>
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
  query actualitesListQuery($skip: Int!, $limit: Int!) {
    allNodeActualites(sort: { fields: created }, limit: $limit, skip: $skip) {
      edges {
        node {
          title
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
