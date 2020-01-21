import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const TeleformTemplate = ({ data }) => {
  const teleformulaire = data.nodeTeleformulaires

  return (
    <Layout>
      <SEO
        title={teleformulaire.title}
        description={teleformulaire.body.summary}
      />
      <div key={teleformulaire.path.alias}>
        <TeleformHeader teleform={teleformulaire} />
        <TeleformContent teleform={teleformulaire} />
      </div>
    </Layout>
  )
}

const TeleformHeader = ({ teleform }) => (
  <h2>
    <Link
      to={teleform.path.alias}
      dangerouslySetInnerHTML={{ __html: teleform.title }}
    />
  </h2>
)

const TeleformContent = ({ teleform }) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: teleform.body?.processed }} />
    <TeleformLinks teleform={teleform} />
  </div>
)

const TeleformLinks = ({ teleform }) => {
  return (
    <ul>
      <h3>Liens démarches simplifiées</h3>
      {teleform.field_lien_demarches_simplifiees.map(link => (
        <li>
          <a href={link.uri}>{link.title}</a>
        </li>
      ))}
    </ul>
  )
}

export default TeleformTemplate

export const query = graphql`
  query($slug: String!) {
    nodeTeleformulaires(path: { alias: { eq: $slug } }) {
      title
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
    }
  }
`
