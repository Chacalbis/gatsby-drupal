import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ContentTransformer from "../../components/content-transformer"
import {
  teleformContainer,
  teleformulaire,
  teleformTitle,
  teleformTaxo,
  teleformTaxoItem,
  teleformFooter,
  teleformFooterDate,
  teleformLinks,
  teleformLinksItem,
  teleformLinksList,
  teleformLinksTitle,
  teleformLinksItemTitle,
} from "../../styles/detailsTeleform.module.scss"

const TeleformTemplate = ({ data }) => {
  const teleformulaire = data.nodeTeleformulaires
  return (
    <Layout>
      <SEO
        title={teleformulaire.title}
        description={teleformulaire.body?.summary}
      />
      <section className={teleformContainer}>
        <TeleformHeader teleform={teleformulaire} />
        <TeleformLinks teleform={teleformulaire} />
        <TeleformFooter teleform={teleformulaire} />
      </section>
    </Layout>
  )
}

const TeleformHeader = ({ teleform }) => (
  <article className={teleformulaire}>
    <h1 className={teleformTitle}>{teleform.title}</h1>
    {teleform.relationships.field_taxonomie_teleformulaire?.length > 0 && (
      <div className={teleformTaxo}>
        {teleform.relationships.field_taxonomie_teleformulaire.map(taxo => (
          <span className={teleformTaxoItem}>
            <Link to={taxo.path.alias}>{taxo.name}</Link>
          </span>
        ))}
      </div>
    )}
    {teleform.body && <ContentTransformer content={teleform.body.processed} />}
  </article>
)

const TeleformLinks = ({ teleform }) => {
  return (
    <div className={teleformLinks}>
      <ul className={teleformLinksList}>
        {teleform.field_lien_demarches_simplifiees?.length > 0 && (
          <>
            <h3 className={teleformLinksTitle}>Liens démarches simplifiées</h3>
            {teleform.field_lien_demarches_simplifiees.map(link => (
              <>
                <li className={teleformLinksItem}>
                  <a target="_blank" rel="noopener noreferrer" href={link.uri}>
                    <p className={teleformLinksItemTitle}>{link.title}</p>
                  </a>
                </li>
                <br />
              </>
            ))}
          </>
        )}
      </ul>
    </div>
  )
}

const TeleformFooter = ({ teleform }) => (
  <div className={teleformFooter}>
    <div className={teleformFooterDate}>posté le {teleform.created}</div>
  </div>
)

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
