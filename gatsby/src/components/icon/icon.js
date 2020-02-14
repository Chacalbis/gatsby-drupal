import React from "react"
import PropTypes from "prop-types"
import IcomoonReact from "icomoon-react"
import iconSet from "./selection.json"

/**
 * Pour rajouter une icone :
 *    - la rajouter dans selection.json (fichier qui a été généré sur https://icomoon.io/)
 *    - l'ajouter dans la liste ci-dessous
 */
export const ICONS = [
  "location2",
  "circle-right",
  "newspaper",
  "address-book",
  "calendar",
  "file-empty",
  "profile",
  "circle-up",
  "facebook",
  "instagram",
  "twitter",
  "youtube",
  "linkedin2",
]

const Icon = ({ size = 20, icon, className }) => {
  return (
    <IcomoonReact
      iconSet={iconSet}
      size={size}
      icon={icon}
      color="currentColor"
      className={className}
    />
  )
}
Icon.propTypes = {
  icon: PropTypes.oneOf(ICONS),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
}

export default Icon
