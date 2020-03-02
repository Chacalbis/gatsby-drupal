require("dotenv").config()
module.exports = {
  siteMetadata: {
    title: `Gatsby with Drupal`,
    description: `Générateur de sites statiques basé sur Gatsby et Drupal`,
    author: `atolcd`,
    config: {
      nepasManquerSlogan: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quisquam illo molestias, harum iusto perspiciatis pariatur corrupti hic aut iste.`,
      bgImagePath: `lune-2000px.jpg`,
      bgImageAlt: `background`,
      slogan: `Bienvenue sur ce nouveau thème !`,
      logoHeaderPath: `logo.svg`,
      logoHeaderAlt: `logo`,
      logoFooterPath: `atol_blanc.svg`,
      logoFooterAlt: `logo atolcd blanc`,
    },
  },
  plugins: [
    {
      resolve: process.env.GATSBY_THEME,
      options: {},
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#1d1d1d`,
        theme_color: `#13C4A5`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
