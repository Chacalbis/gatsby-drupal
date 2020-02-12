import React from "react"
import { useSiteMetadata } from "../../hooks/use-site-metadata"
import Image from "../image"
import {
  backgroundContainer,
  backgroundContainerBis,
  backgroundContainerDetails,
  backgroundWrapper,
  background,
  backgroundText,
} from "./headerTop.module.scss"

const HeaderTop = ({ isIndex, isDetail, message }) => {
  const data = useSiteMetadata()
  let containerClass
  if (isIndex) {
    containerClass = backgroundContainer
  } else if (isDetail) {
    containerClass = backgroundContainerDetails
  } else {
    containerClass = backgroundContainerBis
  }
  return (
    <div className={containerClass}>
      <div className={backgroundWrapper}>
        {isIndex && (
          <Image
            alt={data.config.bgImageAlt}
            className={background}
            filename={data.config.bgImagePath}
          />
        )}
        {message && (
          <div className={backgroundText}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeaderTop
