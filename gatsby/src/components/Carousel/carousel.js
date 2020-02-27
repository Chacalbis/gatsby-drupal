import React from "react"
import BrainhubCarousel from "@brainhubeu/react-carousel"
import "@brainhubeu/react-carousel/lib/style.css"
import NonStretchedImage from "../Image/non-stretched-image"
import {
  addressCarousel,
  addressCarouselItem,
  addressImg,
  addressImgSolo,
} from "./carousel.module.scss"

const MyCarousel = ({ address }) => (
  <div className={addressCarousel}>
    <BrainhubCarousel
      className={addressCarouselItem}
      slidesPerPage={1}
      slidesPerScroll={1}
      animationSpeed={1000}
      autoPlay={5000}
      infinite
      dots
    >
      {address.relationships.field_image_adresse.map(img => {
        const srcImg = img.localFile.childImageSharp.fluid.src
        const altImg = img.localFile.childImageSharp.fluid.originalName
        return (
          <div className={addressImg}>
            <img alt={altImg} src={srcImg} />
          </div>
        )
      })}
    </BrainhubCarousel>
  </div>
)

const Carousel = ({ address }) => {
  if (address.relationships.field_image_adresse.length === 1) {
    return (
      <div className={addressImgSolo}>
        <NonStretchedImage
          {...address.relationships.field_image_adresse[0].localFile
            .childImageSharp}
        />
      </div>
    )
  } else {
    return <MyCarousel address={address} />
  }
}
export default Carousel
