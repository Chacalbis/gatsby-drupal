module.exports = {
  siteMetadata: {
    title: `Gatsby with Drupal`,
    description: `Générateur de sites statiques basé sur Gatsby et Drupal`,
    author: `atolcd`,
    config: {
      nepasManquerSlogan: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quisquam illo molestias, harum iusto perspiciatis pariatur corrupti hic aut iste.`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `http://ternum_bfc_generateur.docker.localhost:8080`,
        apiBase: `jsonapi`, // endpoint of Drupal server
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    // this plugin enables Progressive Web App + Offline functionality
    // Should be loaded after manifest
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    "@bumped-inc/gatsby-plugin-optional-chaining",
  ],
}
