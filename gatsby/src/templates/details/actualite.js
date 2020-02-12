import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import NonStretchedImage from "../../components/non-stretched-image"
import AdditionalInformation from "../../components/additional-information"
import {
  pageActu,
  pageActuAdditionalInfos,
  actualite,
  actualiteImg,
  actualiteTags,
  actualiteTaxo,
  actualiteTitle,
  actualiteContentFooter,
  actualiteContentFooterBack,
  actualiteContentFooterDate,
} from "../../styles/detailsActu.module.scss"
import ContentTransformer from "../../components/content-transformer"

const ActualiteContent = ({ actu }) => (
  <article className={actualite}>
    <div className={actualiteImg}>
      {actu.relationships?.field_image_actus?.localFile?.childImageSharp
        ?.fluid && (
        <NonStretchedImage
          alt={actu.field_image_actus.alt}
          {...actu.relationships.field_image_actus.localFile.childImageSharp}
        />
      )}
      {actu.relationships.field_taxonomie_thematique && (
        <div className={actualiteTags}>
          {actu.relationships.field_taxonomie_thematique.map(taxo => (
            <span className={actualiteTaxo}>
              <Link to={taxo.path.alias}>{taxo.name}</Link>
            </span>
          ))}
        </div>
      )}
    </div>
    <h1 className={actualiteTitle}>{actu.title}</h1>
    {actu.body && <ContentTransformer content={actu.body.processed} />}
  </article>
)

const ActualiteContentFooter = ({ actu }) => (
  <div className={actualiteContentFooter}>
    <div className={actualiteContentFooterBack}>
      <Link to="../actualites">Retour à la liste des actualités</Link>
    </div>
    <div className={actualiteContentFooterDate}>posté le {actu.created}</div>
  </div>
)

const ActualiteInfos = ({ actu }) => (
  <>
    {actu.field_infos_complementaires && (
      <section className={pageActuAdditionalInfos}>
        <AdditionalInformation node={actu} />
      </section>
    )}
  </>
)

const ActualiteTemplate = ({ data }) => {
  const actualite = data.nodeActualites
  return (
    <Layout isDetail={true}>
      <SEO title={actualite.title} description={actualite.body?.summary} />
      <section className={pageActu}>
        <ActualiteContent actu={actualite} />
        <ActualiteContentFooter actu={actualite} />
      </section>
      <ActualiteInfos actu={actualite} />
    </Layout>
  )
}

export default ActualiteTemplate

export const query = graphql`
  query($slug: String!) {
    nodeActualites(path: { alias: { eq: $slug } }) {
      title
      created(formatString: "DD/MM/YYYY", locale: "fr")
      body {
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
`
