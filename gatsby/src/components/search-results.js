import React from "react"
import { Link } from "gatsby"
import {
  results,
  resultsTop,
  resultsContainer,
  resultItem,
  resultContent,
  resultType,
  resultTypeIcon,
  resultTypeType,
  resultTitle,
  resultMore,
  resultResume,
  resultArrow,
} from "./ResultsTaxo/listResults.module.scss"
import SummaryTransformer from "./Transformers/summary-transformer"
import Icon from "./Icon/icon"

const SearchResults = ({ resultats, query }) => {
  return (
    <section className={results}>
      <div className={resultsTop}>
        <h3>
          {resultats.length} résultat(s) pour le terme "{query}"
        </h3>
      </div>
      <div className={resultsContainer}>
        {resultats.map(result => {
          return <Result result={result} />
        })}
      </div>
    </section>
  )
}

const Result = ({ result }) => {
  let iconType = ""
  let nodeType = ""
  switch (result.type) {
    case "node__carnet_d_adresse":
      iconType = "address-book"
      nodeType = "Carnet d'adresse"
      break
    case "node__actualites":
      iconType = "newspaper"
      nodeType = "Actualité"
      break
    case "node__evenements":
      iconType = "calendar"
      nodeType = "Evènement"
      break
    case "node__teleformulaires":
      iconType = "profile"
      nodeType = "Téléformulaire"
      break
    default:
      iconType = "file-empty"
      nodeType = "Page"
  }
  return (
    <article className={resultItem}>
      <Link to={result.url}>
        <div className={resultContent}>
          <div className={resultType}>
            <Icon className={resultTypeIcon} size={20} icon={iconType} />
            <h3 className={resultTypeType}>{nodeType}</h3>
          </div>
          <h4 className={resultTitle}>{result.title}</h4>
          {result.processed && (
            <p
              className={resultResume}
              dangerouslySetInnerHTML={{
                __html: SummaryTransformer(result, 200),
              }}
            />
          )}
        </div>
        <div className={resultMore}>
          <Icon className={resultArrow} size={30} icon="circle-right" />
        </div>
      </Link>
    </article>
  )
}

export default SearchResults
