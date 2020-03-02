import React from "react"
import { Link } from "gatsby"
import {
  paginationWrapper,
  paginationNumbersContainer,
  activeLink,
} from "./pagination.module.scss"

const Pagination = ({ numPages, currentPage, contextPage }) => {
  if (numPages <= 1) {
    return null
  }
  // for each templates, entity property passed in pageContext will be different
  const baseLink = contextPage ? contextPage : ""
  const { startPage, endPage } = defineRange(currentPage, numPages)
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? baseLink
      : baseLink + "/page/" + (currentPage - 1).toString()
  const nextPage = baseLink + "/page/" + (currentPage + 1).toString()
  return (
    <nav className={paginationWrapper}>
      <ul className={paginationNumbersContainer}>
        {!isFirst && (
          <>
            <li>
              <Link to={baseLink}>&lt;&lt;</Link>
            </li>
            <li>
              <Link to={prevPage}>&lt;</Link>
            </li>
          </>
        )}
        {Array.from({ length: numPages })
          .slice(startPage, endPage)
          .map((_, i) => {
            const index = i + startPage + 1
            const link =
              index === 1 ? `${baseLink}` : `${baseLink}/page/${index}`
            return (
              <li current={currentPage === index ? 1 : 0} key={link}>
                {currentPage === index ? (
                  <span className={activeLink}>{index}</span>
                ) : (
                  <Link to={link}>{index}</Link>
                )}
              </li>
            )
          })}
        {!isLast && (
          <>
            <li>
              <Link to={nextPage}>&gt;</Link>
            </li>
            <li>
              <Link to={`${baseLink}/page/${endPage}`}>&gt;&gt;</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

function defineRange(currentPage, numPages) {
  let startPage, endPage
  if (numPages <= 9) {
    // less than 10 total pages, show all
    startPage = 0
    endPage = numPages
  } else {
    // more than 10 total pages, calculate start and end pages
    if (currentPage <= 6) {
      startPage = 0
      endPage = 9
    } else if (currentPage + 4 >= numPages) {
      startPage = numPages - 9
      endPage = numPages
    } else {
      startPage = currentPage - 5
      endPage = currentPage + 4
    }
  }
  return { startPage, endPage }
}

export default Pagination
