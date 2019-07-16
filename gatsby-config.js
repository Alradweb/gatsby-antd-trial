/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Test`,
    language: "en",
    helmetMetaData: [
      { name: 'description', content: 'Sample' },
      { name: 'keywords', content: 'sample, something' },
    ],
    menuLinks: [
      {
        name: "home",
        link: "/",
        key: 1
      },
      {
        name: "articles",
        link: "/articles/",
        key: 2
      },
      {
        name: "users",
        link: "/users/",
        key: 3
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
        contentTypes: [`article`, `user`],
        queryLimit: 1000,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
