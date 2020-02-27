import React, { useState, useEffect } from "react"
import { useSiteMetadata } from "../../../hooks/use-site-metadata"
import Image from "../../Image/image"
import {
  backgroundContainer,
  backgroundContainerBis,
  backgroundContainerDetails,
  backgroundWrapper,
  background,
  backgroundText,
  searchButton,
} from "./header-top.module.scss"
import SearchResults from "../../search-results"
import Icon from "../../Icon/icon"
import root from "window-or-global"

const HeaderTop = ({ isIndex, isDetail, message, children }) => {
  const data = useSiteMetadata()
  const [results, setResults] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    if (searchQuery && root.__LUNR__) {
      root.__LUNR__.__loaded.then(lunr => {
        const refs = lunr.fr.index.search(searchQuery)
        const posts = refs.map(({ ref }) => lunr.fr.store[ref])
        setResults(posts)
      })
    }
  }, [searchQuery])
  let containerClass
  if (isIndex) {
    containerClass = backgroundContainer
  } else if (isDetail) {
    containerClass = backgroundContainerDetails
  } else {
    containerClass = backgroundContainerBis
  }
  return (
    <>
      <div className={containerClass}>
        <div className={backgroundWrapper}>
          {isIndex && (
            <Image
              alt={data.config.bgImageAlt}
              className={background}
              filename={data.config.bgImagePath}
            />
          )}
          {message && (
            <div className={backgroundText}>
              <p>{message}</p>
            </div>
          )}
          <input
            type="search"
            id="search-input"
            name="keywords"
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Rechercher..."
          />
          <button className={searchButton}>
            <Icon icon="search" size={16}></Icon>
          </button>
        </div>
      </div>
      {searchQuery !== "" && (
        <SearchResults query={searchQuery} resultats={results} />
      )}
      {searchQuery === "" && (
        <div>
          <main>{children}</main>
        </div>
      )}
    </>
  )
}

export default HeaderTop
