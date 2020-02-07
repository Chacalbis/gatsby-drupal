import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import Pagination from "../../components/pagination/pagination"
import NonStretchedImage from "../../components/non-stretched-image"
import ContenuLibre from "../../components/contenuLibre"
import SummaryTransformer from "../../components/summary-transformer"
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
} from "../../styles/listEvents.module.scss"

const EvenementInfos = ({ evenement }) => (
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
      {evenement.relationships.field_taxonomie_thematique?.length > 0 && (
        <Link
          to={evenement.relationships.field_taxonomie_thematique[0].path.alias}
        >
          {evenement.relationships.field_taxonomie_thematique[0]?.name}
        </Link>
      )}
    </div>
    <div className={eventsItemTitle}>
      <Link to={evenement.path.alias}>{evenement.title}</Link>
    </div>
    {evenement.body && (
      <div
        className={eventsItemResume}
        dangerouslySetInnerHTML={{
          __html: SummaryTransformer(evenement.body, 200),
        }}
      />
    )}
  </>
)

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

const RenderEvenements = ({ eventsData }) => {
  const events = eventsData.allNodeEvenements.edges
  return (
    <>
      {events.map(({ node }) => (
        <div className={eventsItem}>
          <EvenementImg evenement={node} />
          <EvenementInfos evenement={node} />
        </div>
      ))}
    </>
  )
}

const EvenementsTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, baseLink } = pageContext
  return (
    <Layout>
      <section className={zoneEventsLibreHaut}>
        <ContenuLibre zoneTaxoLibre="zone_evenements_haut" />
      </section>
      <section className={listEventsContainer}>
        <div className={eventsContainer}>
          <RenderEvenements eventsData={data} />
        </div>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={baseLink}
        />
      </section>
      <section className={zoneEventsLibreBas}>
        <ContenuLibre zoneTaxoLibre="zone_evenements_bas" />
      </section>
    </Layout>
  )
}

export default EvenementsTemplate

export const query = graphql`
  query evenementsListQuery($skip: Int!, $limit: Int!) {
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
