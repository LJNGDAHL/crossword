module.exports = {
  siteMetadata: {
    title: `Malmö Pride`,
    description: `A crossword puzzle built with Gatsby for Malmö Pride Festival`,
    author: `Katarina Ljungdahl`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `crossword`,
        short_name: `crossword`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/logo-small.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
