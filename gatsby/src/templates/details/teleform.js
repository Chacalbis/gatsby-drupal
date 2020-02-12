import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Teleformulaire from "../../components/teleformulaire/teleformulaire"

const TeleformTemplate = ({ data }) => {
  const teleformulaire = data.nodeTeleformulaires
  return (
    <Layout>
      <SEO
        title={teleformulaire.title}
        description={teleformulaire.body?.summary}
      />
      <Teleformulaire teleformulaire={teleformulaire} />
    </Layout>
  )
}

export default TeleformTemplate

export const query = graphql`
  query($slug: String!) {
    nodeTeleformulaires(path: { alias: { eq: $slug } }) {
      title
      created(formatString: "DD/MM/YYYY", locale: "fr")
      body {
        summary
        processed
      }
      path {
        alias
      }
      field_lien_demarches_simplifiees {
        title
        uri
      }
      relationships {
        field_taxonomie_teleformulaire {
          name
          path {
            alias
          }
        }
      }
    }
  }
`
