import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/Layout/layout"
import Pagination from "../../components/Pagination/pagination"
import NonStretchedImage from "../../components/Image/non-stretched-image"
import ContenuLibre from "../../components/ContenuLibre/contenu-libre"
import SummaryTransformer from "../../components/Transformers/summary-transformer"
import {
  listEventsContainer,
  eventsContainer,
  eventsItem,
  eventsItemImg,
  eventsItemDate,
  eventsItemDateFrom,
  eventsItemDateTo,
  eventsItemTaxo,
  eventsItemTitle,
  eventsItemResume,
  zoneEventsLibreHaut,
  zoneEventsLibreBas,
  eventsFilters,
  eventsFilterByPeriod,
  eventsFilterByTaxo,
  eventsFiltersTaxo,
  eventsFiltersTaxoActive,
  eventsFilterDelete,
} from "./styles/listEvents.module.scss"

const Filtres = ({ eventsData, pageContext }) => {
  const taxoData = eventsData.allTaxonomyTermThematiques.edges
  const [chooseTaxo, setChooseTaxo] = useState("")
  return (
    <>
      <section className={eventsFilters}>
        <div className={eventsFilterByTaxo}>
          <h3>Types d&apos;évènement(s) : </h3>
          {taxoData.map(({ node }) => {
            let taxoActiveClass = false
            if (chooseTaxo === node.name) {
              taxoActiveClass = true
            }
            return (
              <React.Fragment key={node.drupal_id}>
                <span
                  tabIndex={0}
                  role="button"
                  className={
                    taxoActiveClass
                      ? eventsFiltersTaxoActive
                      : eventsFiltersTaxo
                  }
                  onClick={() => {
                    if (chooseTaxo === "" || chooseTaxo !== node.name) {
                      setChooseTaxo(node.name)
                    } else if (chooseTaxo === node.name) {
                      setChooseTaxo("")
                    }
                  }}
                  onKeyDown={() => {
                    if (chooseTaxo === "" || chooseTaxo !== node.name) {
                      setChooseTaxo(node.name)
                    } else if (chooseTaxo === node.name) {
                      setChooseTaxo("")
                    }
                  }}
                >
                  {node.name}
                </span>
              </React.Fragment>
            )
          })}
        </div>
        <div className={eventsFilterByPeriod}></div>
        <div className={eventsFilterDelete}></div>
      </section>
      <FiltreEvenement
        eventsData={eventsData}
        taxoChoisie={chooseTaxo}
        pageContext={pageContext}
      />
    </>
  )
}

const FiltreEvenement = ({ eventsData, pageContext, taxoChoisie }) => {
  const { currentPage, numPages, baseLink } = pageContext
  let filteredData = []
  filteredData = eventsData.allNodeEvenements.edges.reduce((acc, node) => {
    let matchingTaxo = []
    matchingTaxo = node.node.relationships.field_taxonomie_thematique.filter(
      taxo => taxo.name === taxoChoisie
    )
    if (matchingTaxo.length > 0) {
      acc.push(node)
    }
    return acc
  }, [])
  return (
    <>
      <section className={listEventsContainer}>
        <div className={eventsContainer}>
          <RenderEvenements
            taxoChoisie={taxoChoisie}
            eventsData={eventsData}
            filteredData={filteredData}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={baseLink}
        />
      </section>
    </>
  )
}

const EvenementInfos = ({ evenement, taxoChoisie }) => {
  const characterLength = 200
  if (
    taxoChoisie === "" &&
    evenement.relationships.field_taxonomie_thematique?.length > 0
  ) {
    taxoChoisie = evenement.relationships.field_taxonomie_thematique[0].name
  }
  return (
    <>
      <div className={eventsItemDate}>
        <span className={eventsItemDateFrom}>
          Du {evenement.field_date_de_debut}
        </span>
        <span className={eventsItemDateTo}>
          {" "}
          au {evenement.field_date_de_fin}
        </span>
      </div>
      <div className={eventsItemTaxo}>
        <Link to={taxoChoisie}>{taxoChoisie}</Link>
      </div>
      <div className={eventsItemTitle}>
        <Link to={evenement.path.alias}>{evenement.title}</Link>
      </div>
      {evenement.body && (
        <div
          className={eventsItemResume}
          dangerouslySetInnerHTML={{
            __html: SummaryTransformer(evenement.body, characterLength),
          }}
        />
      )}
    </>
  )
}

const EvenementImg = ({ evenement }) => (
  <div className={eventsItemImg}>
    {evenement.relationships.field_image_event?.localFile?.childImageSharp
      ?.fluid && (
      <Link to={evenement.path.alias}>
        <NonStretchedImage
          {...evenement.relationships.field_image_event.localFile
            .childImageSharp}
        />
      </Link>
    )}
  </div>
)

const RenderEvenements = ({ eventsData, filteredData, taxoChoisie }) => {
  const events =
    taxoChoisie === "" ? eventsData.allNodeEvenements.edges : filteredData
  return (
    <>
      {events.map(({ node }) => (
        <div key={node.title} className={eventsItem}>
          <EvenementImg evenement={node} />
          <EvenementInfos taxoChoisie={taxoChoisie} evenement={node} />
        </div>
      ))}
    </>
  )
}

const EvenementsTemplate = ({ data, pageContext }) => {
  return (
    <Layout message="Liste des évènements">
      <section className={zoneEventsLibreHaut}>
        <ContenuLibre zoneTaxoLibre="zone_evenements_haut" />
      </section>
      <Filtres pageContext={pageContext} eventsData={data} />
      <section className={zoneEventsLibreBas}>
        <ContenuLibre zoneTaxoLibre="zone_evenements_bas" />
      </section>
    </Layout>
  )
}

export default EvenementsTemplate

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allTaxonomyTermThematiques {
      edges {
        node {
          name
          drupal_id
        }
      }
    }
    allNodeEvenements(sort: { fields: created }, limit: $limit, skip: $skip) {
      edges {
        node {
          title
          body {
            summary
            processed
          }
          path {
            alias
          }
          field_date_de_debut(locale: "fr", formatString: "DD/MM/YY")
          field_date_de_fin(locale: "fr", formatString: "DD/MM/YY")
          field_image_event {
            alt
          }
          field_infos_complementaires {
            processed
          }
          field_url_lieu {
            title
            uri
          }
          relationships {
            field_image_event {
              localFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            field_taxonomie_thematique {
              name
              path {
                alias
              }
            }
          }
        }
      }
    }
  }
`
