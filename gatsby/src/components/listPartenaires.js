import { Link, graphql, useStaticQuery } from "gatsby"
import React from "react"
import NonStretchedImage from "./non-stretched-image"
import {
  partenairesContainer,
  listPartenairesContainer,
  partenairesTitle,
  partenaireItemImg,
} from "../styles/listPartenaires.module.scss"

const Partenaire = ({ partenaire }) => (
  <Link to={partenaire.url}>
    <NonStretchedImage
      className={partenaireItemImg}
      {...partenaire.relationships.image_direct_link.localFile.childImageSharp}
    />
  </Link>
)

const RenderPartenaires = ({ partenairesData }) => {
  return partenairesData.allDirectLinkEntityDirectLinkEntity.edges.map(({ node }) => {
    return <Partenaire partenaire={node} />
  })
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
            relationships {
              image_direct_link {
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
      <div className={listPartenairesContainer}>
        <h2 className={partenairesTitle}>Nos partenaires</h2>
        <div className={partenairesContainer}>
          <RenderPartenaires partenairesData={data} />
        </div>
      </div>
  )
}

export default ListPartenaires
