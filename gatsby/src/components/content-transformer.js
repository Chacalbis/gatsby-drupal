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
        let properties = {}
        const uuid = node.attribs["data-entity-uuid"]
        let width = node.attribs["width"] + "px"
        let height = node.attribs["height"] + "px"
        const alt = node.attribs["alt"] || ""
        // align
        const align = node.attribs["class"]
        if (align === "align-left") {
          properties["marginLeft"] = "0"
          properties["marginRight"] = "auto"
        } else if (align === "align-right") {
          properties["marginLeft"] = "auto"
          properties["marginRight"] = "0"
        }
        // style
        // Convert string style into object properties
        const style = node.attribs["style"]
        if (style) {
          const regex = /([\w-]*)\s*:\s*([^;]*)/g;
          let match
          while ((match = regex.exec(style))) {
            properties[match[1]] = match[2].trim()
          }
        }
        if (uuid) { // internal images
          for (let i = 0; i < allFiles.edges.length; i++) {
            if (
              allFiles.edges[i].node.drupal_id === uuid &&
              allFiles.edges[i].node.localFile
            ) {
              const imgSharp = allFiles.edges[i].node.localFile.childImageSharp
              if (!width) {
                width = imgSharp.fluid.presentationWidth
              }
              if (!height) {
                height = imgSharp.fluid.presentationHeight
              }
              imgSharp.fluid.presentationWidth = width
              imgSharp.fluid.presentationHeight = height
              imgSharp["alt"] = alt
              imgSharp.style = properties
              return (
                <NonStretchedImage
                  {...imgSharp}
                />
              )
            }
          }
        } else { // external images
          const src = node.attribs["src"]
          if (width) {
            properties["width"] = width
          }
          if (height) {
            properties["height"] = height
          }
          if (src) {
            return <img src={src} alt={alt} style={properties} />
          }
        }
      }
    },
  })
}

export default ContentTransformer
