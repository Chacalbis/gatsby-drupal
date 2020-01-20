import { Link, graphql, useStaticQuery } from "gatsby"
import React from "react"
import NonStretchedImage from "./non-stretched-image"
import {
  accesDirectTitle,
  accesDirectContainer,
  accesDirectItem,
  accesDirectItemImg,
  accesDirectItemDescription,
} from "../styles/accesDirects.module.scss"

const AccesDirect = ({ accesDirect }) => {
  let image = ''
  if (accesDirect.relationships.image_direct_link.localFile.extension === 'svg') {
    image = <img className={accesDirectItemImg} src={accesDirect.relationships.image_direct_link.localFile.publicURL} alt={accesDirect.image_direct_link.alt || ""} />
  }
  else if (accesDirect.relationships?.image_direct_link?.localFile?.childImageSharp.fluid) {
    image = <NonStretchedImage
      className={accesDirectItemImg}
      {...accesDirect.relationships.image_direct_link.localFile.childImageSharp}
    />
  }
  return (
    <Link to={accesDirect.url}>
      {image}
      <div className={accesDirectItemDescription}>{accesDirect.name}</div>
    </Link>
  )
}

const RenderAccesDirect = ({ accesDirectData }) => {
  const accesDirects = accesDirectData.allDirectLinkEntityDirectLinkEntity.edges
  return (
    <>
      {accesDirects.map(({ node }) => (
        <div className={accesDirectItem}>
          <AccesDirect accesDirect={node} />
        </div>
      ))}
    </>
  )
}

const AccesDirects = () => {
  const data = useStaticQuery(graphql`
    query ListAccesDirectQuery {
      allDirectLinkEntityDirectLinkEntity(
        filter: {
          relationships: { direct_link_type: { name: { eq: "acces_direct" } } }
          highlight: { eq: true }
        }
        limit: 10
      ) {
        edges {
          node {
            name
            url
            image_direct_link {
              alt
            }
            relationships {
              image_direct_link {
                localFile {
                  extension
                  publicURL
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
      <h2 className={accesDirectTitle}>Accès Direct</h2>
      <div className={accesDirectContainer}>
        <RenderAccesDirect accesDirectData={data} />
      </div>
    </>
  )
}

export default AccesDirects
