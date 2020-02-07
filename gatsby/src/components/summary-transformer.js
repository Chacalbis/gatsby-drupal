const SummaryTransformer = (content, length) => {
  let transformedContent = ""
  let summaryContent = content.summary
  let fullContent = content.processed
  if (summaryContent) {
    transformedContent = summaryContent
  } else if (fullContent) {
    transformedContent = fullContent.replace(/(<([^>]+)>)/gi, "")
    let searchKey = "^(.{" + length + "}[^\\s]*).*"
    let regex = new RegExp(searchKey, "s")
    transformedContent = transformedContent.replace(regex, "$1") + " ..."
  }
  return transformedContent
}

export default SummaryTransformer
