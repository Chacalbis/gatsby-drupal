import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import NonStretchedImage from "../../components/non-stretched-image"
import AdditionalInformation from "../../components/additional-information"

const EvenementTemplate = ({ data }) => {
  const evenement = data.nodeEvenements
  return (
    <Layout>
      <SEO title={evenement.title} description={evenement.body.summary} />
      <div key={evenement.path.alias}>
        <EvenementHeader event={evenement} />
        <EvenementContent event={evenement} />
      </div>
    </Layout>
  )
}

const EvenementHeader = ({ event }) => (
  <div>
    <h2>
      <Link
        to={event.path.alias}
        dangerouslySetInnerHTML={{ __html: event.title }}
      />
    </h2>
    <EvenementDetails event={event} />
  </div>
)

const EvenementDetails = ({ event }) => (
  <div>
    {event.relationships?.field_taxonomie_evenement && (
      <Link
        to={event.relationships.field_taxonomie_evenement.path.alias}
        dangerouslySetInnerHTML={{
          __html: event.relationships?.field_taxonomie_evenement.name,
        }}
      />
    )}
    <div>
      {event.field_date_de_debut && event.field_date_de_debut}
      {` - `}
      {event.field_date_de_fin && event.field_date_de_fin}
    </div>
    <div>
      {event.field_url_lieu && (
        <a href={event.field_url_lieu.uri}>
          <span>{event.field_url_lieu.title}</span>
        </a>
      )}
    </div>
  </div>
)

const EvenementContent = ({ event }) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: event.body?.processed }} />
    {event.relationships?.field_image_event?.localFile?.childImageSharp
      ?.fluid && (
      <NonStretchedImage
        {...event.relationships.field_image_event.localFile.childImageSharp}
      />
    )}
    <AdditionalInformation node={event} />
  </div>
)

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
      field_date_de_debut(locale: "fr", formatString: "DD MMMM YYYY, h:mm a")
      field_date_de_fin(locale: "fr", formatString: "DD MMMM YYYY, h:mm a")
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
                src
                presentationWidth
                presentationHeight
                aspectRatio
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
