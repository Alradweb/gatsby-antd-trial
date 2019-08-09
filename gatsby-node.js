/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
//const createPaginatedPages = require('gatsby-paginate')
const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for article nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result
    }),
  )
})


// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getArticles = makeRequest(graphql, `
    {
      allStrapiArticle {
        edges {
          node {
            id
            customPath
          }
        }
      }
    }
    `).then(result => {
    const postsPerPage = 3
    const numPages = Math.ceil(result.data.allStrapiArticle.edges.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/articles/` : `/articles/${i + 1}`,
        component: path.resolve("src/templates/articles-list.js"),
        context: { limit: postsPerPage, skip: i * postsPerPage, numPages, currentPage: i + 1 },
      })
    })

    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        // path: `/articles/${node.id}`,
        path: `/articles/${node.customPath}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  })
  //-----------------------
  const getNews = makeRequest(graphql, `
    {
      allStrapiNewsarticle{
    edges {
      node {
        customPath
        id
      }
    }
  }
    }
    `).then(result => {
     //console.log(result.data.allStrapiNewsarticle.edges)
    const newsPerPage = 3
    const numPages = Math.ceil(result.data.allStrapiNewsarticle.edges.length / newsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/news/` : `/news/${i + 1}`,
        component: path.resolve("src/templates/news-list.js"),
        context: { limit: newsPerPage, skip: i * newsPerPage, numPages, currentPage: i + 1 },
      })
    })

    // Create pages for each article.
    result.data.allStrapiNewsarticle.edges.forEach(({ node }) => {
      createPage({
        path: `/news/${node.customPath}`,
        component: path.resolve(`src/templates/new.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  //------------------------
  const getAuthors = makeRequest(graphql, `
    {
      allStrapiUser {
        edges {
          node {
            id
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each user.
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.id}`,
        component: path.resolve(`src/templates/author.js`),
        context: {
          id: node.id,
        },
      })
    })
  })
  // Queries for styles and authors nodes to use in creating pages.
  return Promise.all([
    getArticles,
    getNews,
    getAuthors,
  ])
}