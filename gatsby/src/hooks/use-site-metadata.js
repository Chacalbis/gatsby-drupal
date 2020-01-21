import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            description
            author
            config {
              nepasManquerSlogan
              bgImagePath
              bgImageAlt
              slogan
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
