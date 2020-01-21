import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import NonStretchedImage from "../../components/non-stretched-image"
import AdditionalInformation from "../../components/additional-information"
import ContentTransformer from "../../components/content-transformer"

const PageTemplate = ({ data }) => {
  const page = data.nodePage

  return (
    <Layout>
      <SEO title={page.title} description={page.body.summary} />
      <div key={page.path.alias}>
        <PageHeader page={page} />
        <PageContent page={page} />
      </div>
    </Layout>
  )
}

const PageHeader = ({ page }) => (
  <h2>
    <Link
      to={page.path.alias}
      dangerouslySetInnerHTML={{ __html: page.title }}
    />
  </h2>
)

const PageContent = ({ page }) => (
  <div>
    <ContentTransformer content={page.body.processed} />
    {page.relationships?.field_image_page_de_base?.localFile?.childImageSharp
      ?.fluid && (
      <NonStretchedImage
        {...page.relationships.field_image_page_de_base.localFile
          .childImageSharp}
      />
    )}
    <AdditionalInformation node={page} />
  </div>
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
      field_mise_en_avant
      field_ordre
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
