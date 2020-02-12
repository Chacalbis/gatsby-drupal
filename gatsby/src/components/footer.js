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
  footerSocialLinks,
  footerLogo,
  footerLogoImg,
} from "../styles/footer.module.scss"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import Image from "./image"
import Icon from "./icon/icon"

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
              <li>
                <Link to={link.url.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={footerNewsletter}>
        <h2 className={footerNewsletterTitle}>S'inscrire à notre newsletter</h2>
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
            <a href="">Actu test</a>
          </li>
          <li>
            <a href="">Actu test</a>
          </li>
          <li>
            <a href="">Actu test</a>
          </li>
          <li>
            <a href="">Actu test</a>
          </li>
        </ul>
      </div>
      <div className={footerSocial}>
        <ul className={footerSocialLinks}>
          <li>test</li>
          <li>test</li>
          <li>test</li>
          <li>test</li>
          <li>test</li>
        </ul>
        <div className={footerLogo}>
          <Image
            alt={metaData.config.logoFooterAlt}
            className={footerLogoImg}
            filename={metaData.config.logoFooterPath}
          />
        </div>
      </div>
      <div className={goToHead}>
        <Link to="#">
          <Icon className={goHeadIcon} size={65} icon="circle-up"></Icon>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
