import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState } from "react"
import {
  header,
  burgerMenu,
  burgerMenuOpen,
  logoSite,
  mainNav,
  navList,
  navItemtitle,
  navItem,
  subNavContainer,
  subNav,
  subNavtitle,
  subNavItemTitle,
  logoSiteImg,
} from "./header.module.scss"
import Image from "../../Image/image"
import { useSiteMetadata } from "../../../hooks/use-site-metadata"

function replaceLink(link) {
  const regex = new RegExp("internal:")
  if (regex.test(link)) {
    return link.replace(regex, "")
  }
  return link
}

const MainMenu = ({ mainMenuData }) => {
  const menuWithoutParent = mainMenuData.filter(
    ({ node }) => !node.drupal_parent_menu_item
  )
  const menuWithParent = mainMenuData.filter(
    ({ node }) => node.drupal_parent_menu_item
  )
  let menuLevelTwo, menuLevelThree
  return (
    <nav className={mainNav}>
      <ul className={navList}>
        {menuWithoutParent.map(item => {
          menuLevelTwo = menuWithParent.filter(
            ({ node }) =>
              node.drupal_parent_menu_item ===
              `menu_link_content:${item.node.drupal_id}`
          )
          return (
            <li className={navItem}>
              <span className={navItemtitle}>
                <Link to={replaceLink(item.node.link.uri)}>
                  {item.node.title}
                </Link>
              </span>
              {menuLevelTwo.length > 0 && (
                <div className={subNavContainer}>
                  {menuLevelTwo.map(child => {
                    menuLevelThree = menuWithParent.filter(
                      ({ node }) =>
                        node.drupal_parent_menu_item ===
                        `menu_link_content:${child.node.drupal_id}`
                    )
                    return (
                      <ul className={subNav}>
                        <Link to={replaceLink(child.node.link.uri)}>
                          <div className={subNavtitle}>
                            <p>{child.node.title}</p>
                          </div>
                        </Link>
                        {menuLevelThree.length > 0 && (
                          <>
                            {menuLevelThree.map(lastChild => {
                              return (
                                <li className={subNavItemTitle}>
                                  <Link
                                    to={replaceLink(lastChild.node.link.uri)}
                                  >
                                    {lastChild.node.title}
                                  </Link>
                                </li>
                              )
                            })}
                          </>
                        )}
                      </ul>
                    )
                  })}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const Header = () => {
  const metaData = useSiteMetadata()
  const data = useStaticQuery(graphql`
    query menuLinkQuery {
      allMenuLinkContentMenuLinkContent(
        sort: { fields: weight, order: ASC }
        filter: { enabled: { eq: true } }
      ) {
        edges {
          node {
            title
            weight
            drupal_parent_menu_item
            drupal_id
            link {
              uri
            }
          }
        }
      }
    }
  `)
  const [openBurger, setOpenBurger] = useState(false)
  const menuData = data.allMenuLinkContentMenuLinkContent.edges
  return (
    <header className={header}>
      <div
        className={!openBurger ? burgerMenu : burgerMenuOpen}
        openBurger={openBurger}
        onClick={() => setOpenBurger(!openBurger)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={logoSite}>
        <Link to="">
          <Image
            alt={metaData.config.logoHeaderAlt}
            className={logoSiteImg}
            filename={metaData.config.logoHeaderPath}
          />
        </Link>
      </div>
      <MainMenu mainMenuData={menuData} />
    </header>
  )
}

export default Header