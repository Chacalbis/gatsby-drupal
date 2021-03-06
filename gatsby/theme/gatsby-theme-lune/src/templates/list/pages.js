import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/Layout/layout"
import Pagination from "../../components/Pagination/pagination"
import NonStretchedImage from "../../components/Image/non-stretched-image"
import ContenuLibre from "../../components/ContenuLibre/contenu-libre"
import {
  nePasManquerContainer,
  nePasManquerWrapper,
  nePasManquerItem,
  nePasManquerItemDescription,
  nePasManquerItemImg,
  zoneAnePasManquerLibreBas,
  zoneAnePasManquerLibreHaut,
} from "./styles/listPage.module.scss"

const NePasManquer = ({ nePasManquer }) => (
  <Link to={nePasManquer.path.alias}>
    <figure className={nePasManquerItem}>
      <NonStretchedImage
        className={nePasManquerItemImg}
        {...nePasManquer.relationships.field_image_page_de_base.localFile
          .childImageSharp}
      />
      <figcaption className={nePasManquerItemDescription}>
        {nePasManquer.title}
      </figcaption>
    </figure>
  </Link>
)

const RenderNePasManquer = ({ nePasManquerData }) => {
  return nePasManquerData.allNodePage.edges.map(({ node }) => {
    return <NePasManquer key={node.drupal_id} nePasManquer={node} />
  })
}

const NePasManquerTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, baseLink } = pageContext
  return (
    <Layout message="Liste des pages à ne pas manquer">
      <section className={zoneAnePasManquerLibreHaut}>
        <ContenuLibre zoneTaxoLibre="zone_a_ne_pas_manquer_haut" />
      </section>
      <section className={nePasManquerWrapper}>
        <div className={nePasManquerContainer}>
          <RenderNePasManquer nePasManquerData={data} />
        </div>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={baseLink}
        />
      </section>
      <section className={zoneAnePasManquerLibreBas}>
        <ContenuLibre zoneTaxoLibre="zone_a_ne_pas_manquer_bas" />
      </section>
    </Layout>
  )
}

export default NePasManquerTemplate

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allNodePage(
      filter: { field_mise_en_avant: { eq: true } }
      sort: { fields: field_ordre, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          drupal_id
          path {
            alias
          }
          relationships {
            field_image_page_de_base {
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
`
