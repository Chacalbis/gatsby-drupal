import React from "react"

const AdditionalInformation = ({ node }) => {
  if (node.field_infos_complementaires?.processed) {
    return (
      <div>
        <h3>Informations complémentaires</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: node.field_infos_complementaires.processed,
          }}
        />
      </div>
    )
  }
  return null
}

export default AdditionalInformation
