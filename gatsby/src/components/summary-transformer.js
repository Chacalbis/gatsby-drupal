import React from "react"

const SummaryTransformer = (content, length) => {
  let fullContent = content.processed
  let searchKey = "^(.{" + length + "}[^\\s]*).*"
  let regex = new RegExp(searchKey, "ig")
  let trimmedString = fullContent.replace(regex, "$1") + " ..."

  let contentDisplayed = ""
  if (content.summary) {
    contentDisplayed = content.summary
  } else if (fullContent) {
    contentDisplayed = trimmedString
  }
  return contentDisplayed
}

export default SummaryTransformer
