import { Link, graphql, useStaticQuery } from "gatsby"
import React from "react"
import {
  listEventsContainer,
  listEventsTitle,
  eventsContainer,
  allEvents,
  eventsItem,
  eventsItemImg,
  eventsItemDate,
  eventsItemDateFrom,
  eventsItemDateTo,
  eventsItemTaxo,
  eventsItemTitle,
} from "../styles/agendaEvenements.module.scss"
import NonStretchedImage from "./non-stretched-image"

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
    {evenement.relationships.field_taxonomie_thematique?.length > 0 && (
      <div className={eventsItemTaxo}>
        {evenement.relationships.field_taxonomie_thematique[0].name}
      </div>
    )}
    <div className={eventsItemTitle}>
      <Link to={evenement.path.alias}>{evenement.title}</Link>
    </div>
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

const AgendaEvenements = () => {
  const data = useStaticQuery(graphql`
    query ListEventsQuery {
      allNodeEvenements(
        sort: { fields: field_date_de_debut, order: ASC }
        limit: 4
      ) {
        edges {
          node {
            field_date_de_debut(formatString: "DD/MM/YYYY", locale: "fr")
            field_date_de_fin(formatString: "DD/MM/YYYY", locale: "fr")
            title
            path {
              alias
            }
            relationships {
              field_taxonomie_thematique {
                name
              }
              field_image_event {
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
  `)
  return (
    <div className={listEventsContainer}>
      <h2 className={listEventsTitle}>Agenda</h2>
      <div className={eventsContainer}>
        <RenderEvenements eventsData={data} />
      </div>
      <div className={allEvents}>
        <Link className="btn" to="/event">
          Tous les événements
        </Link>
      </div>
    </div>
  )
}

export default AgendaEvenements
