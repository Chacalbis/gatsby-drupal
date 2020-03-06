import { useStaticQuery, graphql } from "gatsby"

export const useAllContent = () => {
  const allContent = useStaticQuery(
    graphql`
      query {
        allNodeActualites {
            edges {
              node {
                path {
                  alias
                }
                drupal_internal__nid
              }
            }
          }
          allNodeCarnetDAdresse {
            edges {
              node {
                path {
                  alias
                }
                drupal_internal__nid
              }
            }
          }
          allNodeContenuLibre {
            edges {
              node {
                path {
                  alias
                }
                drupal_internal__nid
              }
            }
          }
          allNodeEvenements {
            edges {
              node {
                path {
                  alias
                }
                drupal_internal__nid
              }
            }
          }
          allNodePage {
            edges {
              node {
                drupal_internal__nid
                path {
                  alias
                }
              }
            }
          }
          allNodeTeleformulaires {
            edges {
              node {
                path {
                  alias
                }
                drupal_internal__nid
              }
            }
          }
      }
    `
  )
  return [
      ...allContent.allNodeActualites.edges,
      ...allContent.allNodeCarnetDAdresse.edges,
      ...allContent.allNodeContenuLibre.edges,
      ...allContent.allNodeEvenements.edges,
      ...allContent.allNodePage.edges,
      ...allContent.allNodeTeleformulaires.edges
  ]
}
