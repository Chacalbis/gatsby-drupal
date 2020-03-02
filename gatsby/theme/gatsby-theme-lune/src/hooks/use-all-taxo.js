import { useStaticQuery, graphql } from "gatsby"

export const useAllTaxo = () => {
  const allTaxo = useStaticQuery(
    graphql`
      query allTaxo {
        allTaxonomyTermThematiques {
            edges {
              node {
                path {
                  alias
                }
                drupal_internal__tid
              }
            }
          }
          allTaxonomyTermTeleformulaires {
            edges {
              node {
                drupal_internal__tid
                path {
                  alias
                }
              }
            }
          }
      }
    `
  )
  return [
      ...allTaxo.allTaxonomyTermThematiques.edges,
      ...allTaxo.allTaxonomyTermTeleformulaires.edges,
  ]
}
