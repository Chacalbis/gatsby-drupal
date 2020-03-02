import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"
import {
  footer,
  footerLinks,
  footerNewsletter,
  footerRss,
  footerSocial,
  goToHead,
  goHeadIcon,
  footerNewsletterTitle,
  footerNewsletterInput,
  footerRssTitle,
  footerRssLinks,
  footerLogo,
  footerLogoImg,
} from "./footer.module.scss"
import { useSiteMetadata } from "../../../hooks/use-site-metadata"
import Image from "../../Image/image"
import Icon from "../../Icon/icon"
import SocialMedias from "../../SocialMedias/social-medias"

const Footer = () => {
  const metaData = useSiteMetadata()
  const data = useStaticQuery(graphql`
    query FooterQuery {
      graphqlData {
        menuByName(name: "footer") {
          links {
            url {
              path
            }
            label
          }
        }
      }
    }
  `)
  const footerMenuData = data.graphqlData.menuByName.links
  return (
    <footer className={footer}>
      {footerMenuData.length > 0 && (
        <div className={footerLinks}>
          <ul>
            {footerMenuData.map(link => (
              <li key={link.label}>
                <Link to={link.url.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={footerNewsletter}>
        <h2 className={footerNewsletterTitle}>
          S&apos;inscrire à notre newsletter
        </h2>
        <div className={footerNewsletterInput}>
          <input
            type="email"
            name="email"
            placeholder="Inscrivez votre adresse mail"
          ></input>
          <button type="submit">ok</button>
        </div>
      </div>
      <div className={footerRss}>
        <h2 className={footerRssTitle}>Flux RSS</h2>
        <ul className={footerRssLinks}>
          <li>
            <a href="/">Actu test</a>
          </li>
          <li>
            <a href="/">Actu test</a>
          </li>
          <li>
            <a href="/">Actu test</a>
          </li>
          <li>
            <a href="/">Actu test</a>
          </li>
        </ul>
      </div>
      <div className={footerSocial}>
        <SocialMedias />
        <div className={footerLogo}>
          <Image
            alt={metaData.config.logoFooterAlt}
            className={footerLogoImg}
            filename={metaData.config.logoFooterPath}
          />
        </div>
      </div>
      <div className={goToHead}>
        <a href="#nav">
          <Icon className={goHeadIcon} size={65} icon="circle-up"></Icon>
        </a>
      </div>
    </footer>
  )
}

export default Footer
