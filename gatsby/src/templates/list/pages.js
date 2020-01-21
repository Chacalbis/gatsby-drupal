import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import Pagination from "../../components/pagination/pagination"
import NonStretchedImage from "../../components/non-stretched-image"

const PagesTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, baseLink } = pageContext
  return (
    <Layout>
      <div>
        <h5>
          Page {currentPage} sur {numPages}
        </h5>
      </div>
      <div>
        {data.allNodePage.edges.map(({ node }) => {
          return (
            <div>
              <PageHeader page={node} />
              <PageContent page={node} />
            </div>
          )
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        contextPage={baseLink}
      />
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
    <div dangerouslySetInnerHTML={{ __html: page.body?.processed }} />
    {page.relationships?.field_image_page_de_base?.localFile?.childImageSharp
      ?.fluid && (
      <NonStretchedImage
        {...page.relationships.field_image_page_de_base.localFile
          .childImageSharp}
      />
    )}
  </div>
)

export default PagesTemplate

export const query = graphql`
  query pagesListQuery($skip: Int!, $limit: Int!) {
    allNodePage(
      sort: { fields: created }
      limit: $limit
      skip: $skip
      filter: { field_mise_en_avant: { eq: true } }
    ) {
      edges {
        node {
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
    }
  }
`
