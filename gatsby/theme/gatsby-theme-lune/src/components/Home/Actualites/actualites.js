import { Link, graphql, useStaticQuery } from "gatsby"
import React from "react"
import {
  listActualitesContainer,
  actualiteContainer,
  actualiteContainerFirst,
  autresActualites,
  actualitesContainer,
  actualiteInfos,
  actualiteImg,
  actualiteCategorie,
  actualiteTitle,
  actualiteResume,
  listActualitesTitle,
  linkActu,
} from "./actualites.module.scss"
import NonStretchedImage from "../../Image/non-stretched-image"
import SummaryTransformer from "../../Transformers/summary-transformer"

const RenderActualites = ({ actualiteData }) => {
  const actus = actualiteData.allNodeActualites.edges
  const firstActu = actus[0].node
  return (
    <>
      <Link className={linkActu} to={firstActu.path.alias}>
        <Actu myClassName={actualiteContainerFirst} actu={firstActu} />
      </Link>
      <div className={autresActualites}>
        {actus.slice(1).map(({ node }) => {
          return <Actu key={node.drupal_id} myClassName={actualiteContainer} actu={node} />
        })}
        <div>
          <Link className="btn" to="/actualites">
            Toutes nos actualités
          </Link>
        </div>
      </div>
    </>
  )
}

const Actu = ({ actu, myClassName }) => {
  let image = ""
  let title = ""
  if (myClassName === actualiteContainerFirst){
    image = (
      <NonStretchedImage
      className={actualiteImg}
      {...actu.relationships.field_image_actus?.localFile.childImageSharp}
    />
    )
    title = (
      <div>{actu.title}</div>
    )
  } else {
    image = (
      <Link to={actu.path.alias}>
         <NonStretchedImage
           className={actualiteImg}
           {...actu.relationships.field_image_actus?.localFile.childImageSharp}
         />
        </Link>
    )
    title = (
      <Link to={actu.path.alias}>{actu.title}</Link>
    )
  }
  return (
  <div className={myClassName}>
    {actu.relationships.field_image_actus?.localFile?.childImageSharp
      ?.fluid && (
        <>
          {image}
        </>
      )}
    <div className={actualiteInfos}>
      {actu.relationships.field_taxonomie_thematique?.length > 0 && (
        <div className={actualiteCategorie}>
          <p>{actu.relationships.field_taxonomie_thematique[0].name}</p>
        </div>
      )}
      <h3 className={actualiteTitle}>
        {title}
      </h3>
      {actu.body && (
        <p
          className={actualiteResume}
          dangerouslySetInnerHTML={{
            __html: SummaryTransformer(actu.body, 200),
          }}
        />
      )}
    </div>
  </div>
  )
}

const ListActualites = () => {
  const data = useStaticQuery(graphql`
    query {
      allNodeActualites(limit: 4, sort: { fields: created, order: DESC }) {
        edges {
          node {
            title
            drupal_id
            path {
              alias
            }
            status
            relationships {
              field_taxonomie_thematique {
                name
                path {
                  alias
                }
              }
              field_image_actus {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            body {
              summary
              processed
            }
          }
        }
      }
      taxonomyTermZoneDefinie(name: { eq: "actualites" }) {
        field_label
      }
    }
  `)
  return (
    <div className={listActualitesContainer}>
      <h2 className={listActualitesTitle}>
        {data.taxonomyTermZoneDefinie.field_label || "À la une"}
      </h2>
      <div className={actualitesContainer}>
        <RenderActualites actualiteData={data} />
      </div>
    </div>
  )
}

export default ListActualites
