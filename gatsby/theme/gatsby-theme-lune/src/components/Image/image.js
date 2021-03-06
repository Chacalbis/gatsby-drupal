import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              extension
              publicURL
              relativePath
              name
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.filename)
      })
      if (!image) {
        return null
      }
      if (image.node.extension === "svg") {
        return (
          <img
            className={props.className}
            alt={props.alt}
            src={image.node.publicURL}
          />
        )
      } else {
        return (
          <Img
            className={props.className}
            alt={props.alt}
            fluid={image.node.childImageSharp.fluid}
          />
        )
      }
    }}
  />
)

export default Image
