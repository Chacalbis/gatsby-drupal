import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import Image from "./image"
import {
  backgroundContainer,
  backgroundWrapper,
  background,
  backgroundText,
} from "../styles/backgroundImage.module.scss"

const BackgroundImage = () => {
  const data = useSiteMetadata()
  return (
    <div className={backgroundContainer}>
      <div className={backgroundWrapper}>
        <Image
          alt={data.config.bgImageAlt}
          className={background}
          filename={data.config.bgImagePath}
        />
        <div className={backgroundText}>
          <p>{data.config.slogan}</p>
        </div>
      </div>
    </div>
  )
}

export default BackgroundImage
