import { Link, graphql, useStaticQuery } from "gatsby"
import React from "react"
import NonStretchedImage from "./non-stretched-image"
import {
  nePasManquerContainer,
  nePasManquerItem,
  nePasManquerItemDescription,
  nePasManquerItemImg,
  nePasManquerTitle,
  nePasManquerResume,
  allNePasManquer,
} from "../styles/listNePasManquer.module.scss"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const NePasManquer = ({ nePasManquer }) => (
  <Link to={nePasManquer.path.alias}>
    <figure className={nePasManquerItem}>
      <NonStretchedImage
        className={nePasManquerItemImg}
        {...nePasManquer.relationships.field_image_page_de_base.localFile
          .childImageSharp}
      />
      <figcaption className={nePasManquerItemDescription}>
        {nePasManquer.title}
      </figcaption>
    </figure>
  </Link>
)

const RenderNePasManquer = ({ nePasManquerData }) => {
  return nePasManquerData.allNodePage.edges.map(({ node }) => {
    return <NePasManquer nePasManquer={node} />
  })
}

const ListNePasManquer = () => {
  const metaData = useSiteMetadata()
  const data = useStaticQuery(graphql`
    query ListNePasManquerQuery {
      allNodePage(
        filter: { field_mise_en_avant: { eq: true } }
        sort: { fields: field_ordre, order: DESC }
      ) {
        edges {
          node {
            title
            path {
              alias
            }
            relationships {
              field_image_page_de_base {
                localFile {
                  childImageSharp {
                    fluid {
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
  `)
  return (
    <>
      <h2 className={nePasManquerTitle}>À ne pas manquer</h2>
      <p className={nePasManquerResume}>{metaData.config.nepasManquerSlogan}</p>
      <div className={nePasManquerContainer}>
        <RenderNePasManquer nePasManquerData={data} />
      </div>
      <div className={allNePasManquer}>
        <Link className="btn" to="/page">
          Voir plus
        </Link>
      </div>
    </>
  )
}

export default ListNePasManquer