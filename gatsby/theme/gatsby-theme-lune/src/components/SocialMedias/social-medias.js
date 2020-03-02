import React from "react"
import {
  footerSocialLinks,
  footerSocialItem,
} from "./social-medias.module.scss"
import Icon from "../Icon/icon"

const SocialMedias = () => {
  let tabIcon = ["facebook", "instagram", "twitter", "youtube", "linkedin2"]
  return (
    <ul className={footerSocialLinks}>
      {tabIcon.map(socialIcon => (
        <li key={socialIcon} className={footerSocialItem}>
          <a href="/">
            <Icon size={20} icon={socialIcon} />
          </a>
        </li>
      ))}
    </ul>
  )
}
export default SocialMedias
