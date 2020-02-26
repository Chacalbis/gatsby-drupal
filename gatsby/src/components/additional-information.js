import React from "react"
import ContentTransformer from "./content-transformer"

const AdditionalInformation = ({ node }) => {
  if (node.field_infos_complementaires?.processed) {
    return (
      <div>
        <h3>Informations complémentaires</h3>
        <ContentTransformer content={node.field_infos_complementaires.processed} />
      </div>
    )
  }
  return null
}

export default AdditionalInformation
