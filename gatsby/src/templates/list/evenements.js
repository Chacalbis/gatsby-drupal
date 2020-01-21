import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import Pagination from "../../components/pagination/pagination"
import NonStretchedImage from "../../components/non-stretched-image"

const EvenementsTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages, baseLink } = pageContext
  return (
    <Layout>
      <div>
        <h5>
          Page {currentPage} sur {numPages}
        </h5>
      </div>
      <div>
        {data.allNodeEvenements.edges.map(({ node }) => {
          return (
            <div>
              <EvenementHeader event={node} />
              <EvenementContent event={node} />
            </div>
          )
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        contextPage={baseLink}
      />
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

const EvenementContent = ({ event }) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: event.body?.processed }} />
    {event.relationships?.field_image_event?.localFile?.childImageSharp
      ?.fluid && (
      <NonStretchedImage
        {...event.relationships.field_image_event.localFile.childImageSharp}
      />
    )}
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

export default EvenementsTemplate

export const query = graphql`
  query evenementsListQuery($skip: Int!, $limit: Int!) {
    allNodeEvenements(sort: { fields: created }, limit: $limit, skip: $skip) {
      edges {
        node {
          title
          body {
            processed
          }
          path {
            alias
          }
          field_date_de_debut(
            locale: "fr"
            formatString: "DD MMMM YYYY, h:mm a"
          )
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
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            field_taxonomie_evenement {
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
