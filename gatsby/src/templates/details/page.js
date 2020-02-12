import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import NonStretchedImage from "../../components/non-stretched-image"
import AdditionalInformation from "../../components/additional-information"
import ContentTransformer from "../../components/content-transformer"
import SummaryTransformer from "../../components/summary-transformer"
import {
  pageIntro,
  pageBody,
  pageIntroContainer,
  pageIntroTitle,
  pageIntroImg,
  pageAdditionalInfos,
  pageFooter,
  pageFooterBack,
} from "../../styles/detailsPage.module.scss"

const PageTemplate = ({ data }) => {
  const page = data.nodePage
  return (
    <Layout isDetail={true}>
      <SEO title={page.title} description={page.body?.summary} />
      <section className={pageIntro}>
        <PageIntro page={page} />
      </section>
      <section className={pageBody}>
        <ContentTransformer content={page.body.processed} />
        <PageFooter />
      </section>
      <PageInfos page={page} />
    </Layout>
  )
}

const PageIntro = ({ page }) => (
  <>
    <div className={pageIntroContainer}>
      <h1 className={pageIntroTitle}>{page.title}</h1>
      {page.body && (
        <div
          dangerouslySetInnerHTML={{
            __html: SummaryTransformer(page.body, 200),
          }}
        />
      )}
    </div>
    <div className={pageIntroImg}>
      {page.relationships?.field_image_page_de_base?.localFile?.childImageSharp
        ?.fluid && (
        <NonStretchedImage
          {...page.relationships.field_image_page_de_base.localFile
            .childImageSharp}
        />
      )}
    </div>
  </>
)

const PageFooter = () => (
  <div className={pageFooter}>
    <div className={pageFooterBack}>
      <Link to="../pages">Retour à la liste des pages</Link>
    </div>
  </div>
)

const PageInfos = ({ page }) => (
  <>
    {page.field_infos_complementaires && (
      <section className={pageAdditionalInfos}>
        <AdditionalInformation node={page} />
      </section>
    )}
  </>
)

export default PageTemplate

export const query = graphql`
  query($slug: String!) {
    nodePage(path: { alias: { eq: $slug } }) {
      title
      body {
        processed
        summary
      }
      path {
        alias
      }
      field_infos_complementaires {
        processed
      }
      field_image_page_de_base {
        alt
      }
      relationships {
        field_image_page_de_base {
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
