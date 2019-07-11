import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../containers/app-layout"
import Img from "gatsby-image"

const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <ul>
        {data.allStrapiArticle.edges.map(document => (
          <li key={document.node.id}>
            <h2>
              <Link to={`/${document.node.id}`}>{document.node.title}</Link>
            </h2>
            <p>{document.node.content}</p>
            <Img fixed={document.node.image.childImageSharp.fixed}/>
          </li>
        ))}
      </ul>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`  
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          title
          content
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`