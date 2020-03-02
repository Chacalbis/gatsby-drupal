import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import NonStretchedImage from "../../Image/non-stretched-image"
import {
  accesDirectTitle,
  accesDirectContainer,
  accesDirectItem,
  accesDirectItemImg,
  accesDirectItemDescription,
} from "./acces-direct.module.scss"

const AccesDirect = ({ accesDirect }) => {
  let image = ""
  if (
    accesDirect.relationships.image_direct_link.localFile.extension === "svg"
  ) {
    image = (
      <img
        className={accesDirectItemImg}
        src={accesDirect.relationships.image_direct_link.localFile.publicURL}
        alt={accesDirect.image_direct_link.alt || ""}
      />
    )
  } else if (
    accesDirect.relationships?.image_direct_link?.localFile?.childImageSharp
      .fluid
  ) {
    image = (
      <NonStretchedImage
        className={accesDirectItemImg}
        {...accesDirect.relationships.image_direct_link.localFile
          .childImageSharp}
      />
    )
  }
  return (
    <a href={accesDirect.url} target="_blank" rel="noopener noreferrer">
      {image}
      <div className={accesDirectItemDescription}>{accesDirect.name}</div>
    </a>
  )
}

const RenderAccesDirect = ({ accesDirectData }) => {
  const accesDirects = accesDirectData.allDirectLinkEntityDirectLinkEntity.edges
  return (
    <>
      {accesDirects.map(({ node }) => (
        <div key={node.drupal_id} className={accesDirectItem}>
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
            drupal_id
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
      taxonomyTermTypeDeLienDirect(name: { eq: "acces_direct" }) {
        field_label
      }
    }
  `)
  return (
    <>
      <h2 className={accesDirectTitle}>
        {data.taxonomyTermTypeDeLienDirect.field_label || "Accès Direct"}
      </h2>
      <div className={accesDirectContainer}>
        <RenderAccesDirect accesDirectData={data} />
      </div>
    </>
  )
}

export default AccesDirects
