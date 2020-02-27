import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import NonStretchedImage from "./non-stretched-image"
import {
  partenairesContainer,
  listPartenairesContainer,
  partenairesTitle,
  partenaireItemImg,
} from "../styles/listPartenaires.module.scss"

const Partenaire = ({ partenaire }) => {
  let image = ""
  if (
    partenaire.relationships.image_direct_link.localFile.extension === "svg"
  ) {
    image = (
      <img
        className={partenaireItemImg}
        src={partenaire.relationships.image_direct_link.localFile.publicURL}
        alt={partenaire.image_direct_link.alt || ""}
      />
    )
  } else if (
    partenaire.relationships?.image_direct_link?.localFile?.childImageSharp
      .fluid
  ) {
    image = (
      <NonStretchedImage
        alt={partenaire.image_direct_link.alt}
        className={partenaireItemImg}
        {...partenaire.relationships.image_direct_link.localFile
          .childImageSharp}
      />
    )
  }
  return (
    <a target="_blank" rel="noopener noreferrer" href={partenaire.url}>
      {image}
    </a>
  )
}

const RenderPartenaires = ({ partenairesData }) => {
  return partenairesData.allDirectLinkEntityDirectLinkEntity.edges.map(
    ({ node }) => {
      return <Partenaire partenaire={node} />
    }
  )
}

const ListPartenaires = () => {
  const data = useStaticQuery(graphql`
    query ListPartenairesQuery {
      allDirectLinkEntityDirectLinkEntity(
        filter: {
          relationships: { direct_link_type: { name: { eq: "partenaire" } } }
          highlight: { eq: true }
        }
      ) {
        edges {
          node {
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
      taxonomyTermTypeDeLienDirect(name: { eq: "partenaire" }) {
        field_label
      }
    }
  `)
  return (
    <div className={listPartenairesContainer}>
      <h2 className={partenairesTitle}>
        {data.taxonomyTermTypeDeLienDirect.field_label || "Partenaires"}
      </h2>
      <div className={partenairesContainer}>
        <RenderPartenaires partenairesData={data} />
      </div>
    </div>
  )
}

export default ListPartenaires
