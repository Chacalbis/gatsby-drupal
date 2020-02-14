import React from "react"
import { footerSocialLinks, footerSocialItem } from "./socialMedias.module.scss"
import Icon from "../icon/icon"

const SocialMedias = () => {
  let tabIcon = ["facebook", "instagram", "twitter", "youtube", "linkedin2"]
  return (
    <ul className={footerSocialLinks}>
      {tabIcon.map(socialIcon => (
        <li className={footerSocialItem}>
          <a href="/">
            <Icon size={20} icon={socialIcon} />
          </a>
        </li>
      ))}
    </ul>
  )
}
export default SocialMedias
