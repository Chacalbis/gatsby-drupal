import React from "react"
import { Link } from "gatsby"
import Pagination from "../Pagination/pagination"
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
} from "./listResults.module.scss"
import SummaryTransformer from "../Transformers/summary-transformer"
import Icon from "../Icon/icon"

const ResultsTaxo = ({ resultats, pageContext }) => {
  const { currentPage, numPages, baseLink, slugTerm, nodesLength } = pageContext
  return (
    <section className={results}>
      <div className={resultsTop}>
        <h3>
          {nodesLength} résultat(s) pour le terme "{slugTerm}"
        </h3>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={baseLink}
        />
      </div>
      <div className={resultsContainer}>
        {resultats.map(({ node }) => {
          return <Result key={node.drupal_id} node={node} />
        })}
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={baseLink}
        />
      </div>
    </section>
  )
}

const Result = ({ node }) => {
  let iconType = ""
  switch (node.internal.type) {
    case "node__carnet_d_adresse":
      iconType = "address-book"
      break
    case "node__actualites":
      iconType = "newspaper"
      break
    case "node__evenements":
      iconType = "calendar"
      break
    case "node__teleformulaires":
      iconType = "profile"
      break
    default:
      iconType = "file-empty"
  }
  return (
    <article className={resultItem}>
      <Link to={node.path.alias}>
        <div className={resultContent}>
          <div className={resultType}>
            <Icon className={resultTypeIcon} size={20} icon={iconType} />
            <h3 className={resultTypeType}>
              {node.relationships.node_type.name}
            </h3>
          </div>
          <h4 className={resultTitle}>{node.title}</h4>
          {node.body && (
            <p
              className={resultResume}
              dangerouslySetInnerHTML={{
                __html: SummaryTransformer(node.body, 200),
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

export default ResultsTaxo
