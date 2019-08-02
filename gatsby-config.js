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
        icon: "home",
        key: 1
      },
      {
        name: "articles",
        link: "/articles/",
        icon: "book",
        key: 2
      },
      {
        name: "users",
        link: "/users/",
        icon: "smile",
        key: 3
      },
    ],
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
  ],
}
