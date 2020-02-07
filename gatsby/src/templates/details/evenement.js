import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import NonStretchedImage from "../../components/non-stretched-image"
import AdditionalInformation from "../../components/additional-information"
import ContentTransformer from "../../components/content-transformer"
import {
  pageEvent,
  pageEventAdditionalInfos,
  evenement,
  eventImg,
  eventDate,
  eventDateFrom,
  eventDateTo,
  eventTaxo,
  eventTitle,
  eventContent,
  eventFooter,
  eventFooterBack,
  eventPlace,
  eventPlaceIcon,
  eventPlaceTitle,
} from "../../styles/detailsEvent.module.scss"
import Icon from "../../components/icon/icon"

const EvenementContent = ({ event }) => (
  <article className={evenement}>
    <div className={eventImg}>
      {event.relationships?.field_image_event?.localFile?.childImageSharp
        ?.fluid && (
        <NonStretchedImage
          alt={event.field_image_event.alt}
          {...event.relationships.field_image_event.localFile.childImageSharp}
        />
      )}
    </div>
    <div className={eventDate}>
      <span className={eventDateFrom}>Du {event.field_date_de_debut}</span>
      <span className={eventDateTo}> au {event.field_date_de_fin}</span>
    </div>
    <div className={eventTaxo}>
      {event.relationships.field_taxonomie_thematique && (
        <>
          {event.relationships.field_taxonomie_thematique.map(taxo => (
            <Link key={taxo.path.alias} to={taxo.path.alias}>
              {taxo.name}{" "}
            </Link>
          ))}
        </>
      )}
    </div>
    <h2 className={eventTitle}>{event.title}</h2>
    <div className={eventContent}>
      {event.body?.processed && (
        <ContentTransformer content={event.body.processed} />
      )}
    </div>
    {event.field_url_lieu && (
      <div className={eventPlace}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={event.field_url_lieu.uri}
        >
          <Icon className={eventPlaceIcon} size={30} icon="location2"></Icon>
          <p className={eventPlaceTitle}>{event.field_url_lieu.title}</p>
        </a>
      </div>
    )}
  </article>
)

const EvenementFooter = () => (
  <div className={eventFooter}>
    <div className={eventFooterBack}>
      <Link to="../evenements">Retour à la liste des évènements</Link>
    </div>
  </div>
)

const EvenementInfos = ({ event }) => (
  <>
    {event.field_infos_complementaires && (
      <section className={pageEventAdditionalInfos}>
        <AdditionalInformation node={event} />
      </section>
    )}
  </>
)

const EvenementTemplate = ({ data }) => {
  const evenement = data.nodeEvenements
  return (
    <Layout>
      <SEO title={evenement.title} description={evenement.body?.summary} />
      <section className={pageEvent}>
        <EvenementContent event={evenement} />
        <EvenementFooter />
      </section>
      <EvenementInfos event={evenement} />
    </Layout>
  )
}

export default EvenementTemplate

export const query = graphql`
  query($slug: String!) {
    nodeEvenements(path: { alias: { eq: $slug } }) {
      title
      body {
        processed
      }
      path {
        alias
      }
      field_date_de_debut(locale: "fr", formatString: "DD/MM/YY à hh:mm")
      field_date_de_fin(locale: "fr", formatString: "DD/MM/YY à hh:mm")
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
`
