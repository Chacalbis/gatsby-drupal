import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import Pagination from "../../components/pagination/pagination"
import NonStretchedImage from "../../components/non-stretched-image"
import {
  actualiteInfos,
  actualiteImg,
  actualiteCategorie,
  actualiteTitle,
  actualiteResume,
} from "../../styles/listActualites.module.scss"

const ActualitesTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, baseLink } = pageContext
  return (
    <Layout>
      <div>
        <h5>
          Page {currentPage} sur {numPages}
        </h5>
      </div>
      <div>
        {data.allNodeActualites.edges.map(({ node }) => {
          return <Actu actu={node} />
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

const Actu = ({ actu }) => (
  <div>
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
      <span className={actualiteCategorie}>
        <p>{actu.relationships.field_taxonomie_thematique[0]?.name}</p>
      </span>
      <h3 className={actualiteTitle}>
        <Link to={actu.path.alias}>{actu.title}</Link>
      </h3>
      <p className={actualiteResume}>{actu.body?.summary}</p>
    </div>
  </div>
)

export default ActualitesTemplate

export const query = graphql`
  query actualitesListQuery($skip: Int!, $limit: Int!) {
    allNodeActualites(sort: { fields: created }, limit: $limit, skip: $skip) {
      edges {
        node {
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
