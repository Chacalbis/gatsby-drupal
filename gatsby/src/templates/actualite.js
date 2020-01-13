import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NonStretchedImage from "../components/non-stretched-image"
import AdditionalInformation from "../components/additional-information"

const ActualiteTemplate = ({ data }) => {
  const actualite = data.nodeActualites

  return (
    <Layout>
      <SEO title={actualite.title} description={actualite.body?.summary} />
      <div key={actualite.path.alias}>
        <ActualiteHeader actu={actualite} />
        <ActualiteContent actu={actualite} />
      </div>
    </Layout>
  )
}

const ActualiteHeader = ({ actu }) => (
  <h2>
    <Link
      to={actu.path.alias}
      dangerouslySetInnerHTML={{ __html: actu.title }}
    />
  </h2>
)

const ActualiteContent = ({ actu }) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: actu.body?.processed }} />
    {actu.relationships?.field_image_actus?.localFile?.childImageSharp
      ?.fluid && (
      <NonStretchedImage
        {...actu.relationships.field_image_actus.localFile.childImageSharp}
      />
    )}
    <AdditionalInformation node={actu} />
  </div>
)

export default ActualiteTemplate

export const query = graphql`
  query($slug: String!) {
    nodeActualites(path: { alias: { eq: $slug } }) {
      title
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
        field_image_actus {
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
