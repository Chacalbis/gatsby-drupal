import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
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
              logoHeaderPath
              logoHeaderAlt
              logoFooterPath
              logoFooterAlt
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
