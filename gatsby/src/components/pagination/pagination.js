import React from "react"
import { Link } from "gatsby"
import {
  paginationWrapper,
  paginationNumbersContainer,
} from "./pagination.module.scss"

const Pagination = ({ numPages, currentPage, contextPage }) => {
  if (numPages <= 1) {
    return null
  }
  // for each templates, entity property passed in pageContext will be different
  const baseLink = contextPage ? contextPage : ""
  const { startPage, endPage } = defineRange(currentPage, numPages)
  return (
    <div className={paginationWrapper}>
      <div>
        <div className={paginationNumbersContainer}>
          {Array.from({ length: numPages })
            .slice(startPage, endPage)
            .map((_, i) => {
              const index = i + startPage + 1
              const link =
                index === 1 ? `${baseLink}` : `${baseLink}/page/${index}`
              return (
                <div current={currentPage === index} key={link}>
                  {currentPage === index ? (
                    <span>{index}</span>
                  ) : (
                    <Link to={link}>{index}</Link>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
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
