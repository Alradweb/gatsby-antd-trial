/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const config = require('./config/site')
//console.log(config)
module.exports = {
  /* Your site config here */
  siteMetadata: {
   ...config
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-antd',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.DEPLOY_URL
          ? "https://intense-inlet-52562.herokuapp.com"
          : "http://localhost:1337",
        contentTypes: [`article`, `user`, `newsarticle`],
        queryLimit: 100000,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.shortName,
        description: config.description,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://zealous-bohr-df5586.netlify.com',
        sitemap: 'https://zealous-bohr-df5586.netlify.com/sitemap.xml',
        policy: [{ userAgent: '*', disallow: ['/'] }]
      }
    },
  ],
}
