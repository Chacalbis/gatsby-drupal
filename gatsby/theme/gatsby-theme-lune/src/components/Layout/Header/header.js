import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState } from "react"
import {
  header,
  burgerMenu,
  burgerMenuOpen,
  logoSite,
  mainNav,
  navList,
  navItemName,
  navItem,
  subNavContainer,
  subNav,
  subNavName,
  subNavItemTitle,
  logoSiteImg,
} from "./header.module.scss"
import Image from "../../Image/image"
import { useSiteMetadata } from "../../../hooks/use-site-metadata"
import { useAllContent } from "../../../hooks/use-all-content"
import { useAllTaxo } from "../../../hooks/use-all-taxo"

const entityLinkParser = {
  internal: {
    regex: /internal:\/(?!node|taxo)/,
    parser: (children, regex, link, allData, allTaxo) => {
      return <Link to={link.replace(regex, "")}>{children}</Link>
    },
  },
  node: {
    regex: /entity:node\/(\d+)/,
    parser: (children, regex, link, allData, allTaxo) => {
      const drupalId = link.match(regex)[1]
      const processedNode = allData
        .filter(
          ({ node }) => node.drupal_internal__nid == drupalId // eslint-disable-line eqeqeq
        )
        .shift()
      return <Link to={processedNode.node.path.alias}>{children}</Link>
    },
  },
  taxonomy: {
    regex: /internal:\/taxonomy\/term\/(\d+)/,
    parser: (children, regex, link, allData, allTaxo) => {
      const drupalId = link.match(regex)[1]
      const processedNode = allTaxo
        .filter(
          ({ node }) => node.drupal_internal__tid == drupalId // eslint-disable-line eqeqeq
        )
        .shift()
      return <Link to={processedNode.node.path.alias}>{children}</Link>
    },
  },
  nolink: {
    regex: /^route:<nolink>$/,
    parser: (children, regex, link, allData, allTaxo) => {
      return <>{children}</>
    },
  },
}

const ProcessedLink = ({ children, link, allData, allTaxo }) => {
  for (const linkType in entityLinkParser) {
    const typeDef = entityLinkParser[linkType]
    if (typeDef.regex.test(link)) {
      link = typeDef.parser(children, typeDef.regex, link, allData, allTaxo)
    }
  }
  return link
}

const MainMenu = ({ mainMenuData }) => {
  const allData = useAllContent()
  const allTaxo = useAllTaxo()
  const menuWithoutParent = mainMenuData.filter(
    ({ node }) => !node.drupal_parent_menu_item
  )
  const menuWithParent = mainMenuData.filter(
    ({ node }) => node.drupal_parent_menu_item
  )
  let menuLevelThree
  let menuLevelTwo
  return (
    <nav id="top" className={mainNav}>
      <ul className={navList}>
        {menuWithoutParent.map(item => {
          menuLevelTwo = menuWithParent.filter(
            ({ node }) =>
              node.drupal_parent_menu_item ===
              `menu_link_content:${item.node.drupal_id}`
          )
          return (
            <li key={item.node.drupal_id} className={navItem}>
              <div className={navItemName}>
                <ProcessedLink
                  link={item.node.link.uri}
                  allData={allData}
                  allTaxo={allTaxo}
                >
                  <span>{item.node.title}</span>
                </ProcessedLink>
              </div>
              {menuLevelTwo.length > 0 && (
                <div className={subNavContainer}>
                  {menuLevelTwo.map(child => {
                    menuLevelThree = menuWithParent.filter(
                      ({ node }) =>
                        node.drupal_parent_menu_item ===
                        `menu_link_content:${child.node.drupal_id}`
                    )
                    return (
                      <ul key={child.node.drupal_id} className={subNav}>
                        <div className={subNavName}>
                          <ProcessedLink
                            link={child.node.link.uri}
                            allData={allData}
                            allTaxo={allTaxo}
                          >
                            <span>{child.node.title}</span>
                          </ProcessedLink>
                        </div>
                        {menuLevelThree.length > 0 && (
                          <>
                            {menuLevelThree.map(lastChild => {
                              return (
                                <li
                                  key={lastChild.node.drupal_id}
                                  className={subNavItemTitle}
                                >
                                  <ProcessedLink
                                    link={lastChild.node.link.uri}
                                    allData={allData}
                                    allTaxo={allTaxo}
                                  >
                                    {lastChild.node.title}
                                  </ProcessedLink>
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
        tabIndex={0}
        role="button"
        className={!openBurger ? burgerMenu : burgerMenuOpen}
        onClick={() => setOpenBurger(!openBurger)}
        onKeyDown={() => setOpenBurger(!openBurger)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={logoSite}>
        <Link to="/">
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
