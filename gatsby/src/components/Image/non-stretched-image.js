import React from "react"
import Img from "gatsby-image"

const NonStretchedImage = props => {
  let normalizedProps = props
  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        maxWidth: props.fluid.presentationWidth,
        height: props.fluid.presentationHeight,
        margin: "0 auto", // Center image by default
        ...(props.style || {}),
      },
    }
  }
  return <Img {...normalizedProps} />
}

export default NonStretchedImage
