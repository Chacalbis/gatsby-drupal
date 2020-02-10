import React from "react"
import { useSiteMetadata } from "../../hooks/use-site-metadata"
import Image from "../image"
import {
  backgroundContainer,
  backgroundContainerBis,
  backgroundWrapper,
  background,
  backgroundText,
} from "./backgroundImage.module.scss"

const BackgroundImageIndex = ({ isIndex, message }) => {
  const data = useSiteMetadata()
  return (
    <div className={isIndex ? backgroundContainer : backgroundContainerBis}>
      <div className={backgroundWrapper}>
        <Image
          alt={data.config.bgImageAlt}
          className={background}
          filename={data.config.bgImagePath}
        />
        {message && (
          <div className={backgroundText}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BackgroundImageIndex
