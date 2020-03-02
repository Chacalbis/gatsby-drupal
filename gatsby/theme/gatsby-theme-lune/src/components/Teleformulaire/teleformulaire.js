import React from "react"
import { Link } from "gatsby"
import ContentTransformer from "../Transformers/content-transformer"
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
  teleformLibre,
} from "./teleformulaire.module.scss"

const Teleformulaire = ({ teleformulaire, zoneLibre }) => (
  <>
    <section className={zoneLibre ? teleformLibre : teleformContainer}>
      <TeleformHeader teleform={teleformulaire} />
      <TeleformLinks teleform={teleformulaire} />
      {!zoneLibre && <TeleformFooter teleform={teleformulaire} />}
    </section>
  </>
)

const TeleformHeader = ({ teleform }) => (
  <article className={teleformulaire}>
    <h1 className={teleformTitle}>{teleform.title}</h1>
    {teleform.relationships.field_taxonomie_teleformulaire?.length > 0 && (
      <div className={teleformTaxo}>
        {teleform.relationships.field_taxonomie_teleformulaire.map(taxo => (
          <span key={taxo.name} className={teleformTaxoItem}>
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
              <React.Fragment key={link.title}>
                <li className={teleformLinksItem}>
                  <a target="_blank" rel="noopener noreferrer" href={link.uri}>
                    <p className={teleformLinksItemTitle}>{link.title}</p>
                  </a>
                </li>
                <br />
              </React.Fragment>
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

export default Teleformulaire
