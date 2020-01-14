import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ReactHtmlParser from "react-html-parser"
import NonStretchedImage from "./non-stretched-image"

const ContentTransformer = ({ content }) => {
  const data = useStaticQuery(graphql`
    query {
      allFileFile {
        edges {
          node {
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
            drupal_id
          }
        }
      }
    }
  `)
  const { allFileFile } = data
  const transformedContent = processInlineImages(content, allFileFile)
  return <div>{transformedContent}</div>
}

const processInlineImages = (content, allFiles) => {
  return new ReactHtmlParser(content, {
    transform: function transform(node) {
      if (node.type === "tag" && node.name === "img") {
        let uuid = node.attribs["data-entity-uuid"]
        if (uuid) {
          for (let i = 0; i < allFiles.edges.length; i++) {
            if (
              allFiles.edges[i].node.drupal_id === uuid &&
              allFiles.edges[i].node.localFile
            ) {
              return (
                <NonStretchedImage
                  {...allFiles.edges[i].node.localFile.childImageSharp}
                />
              )
            }
          }
        } else {
          let src = node.attribs["src"]
          let width = node.attribs["width"]
          let height = node.attribs["height"]
          if (src && width && height) {
            let img = {
              fluid: {
                src: src,
                presentationWidth: width,
                presentationHeight: height,
                aspectRatio: width / height,
              },
            }
            return <NonStretchedImage {...img} />
          }
        }
      }
    },
  })
}

export default ContentTransformer
