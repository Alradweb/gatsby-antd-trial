import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../containers/app-layout"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"
import { Col, Row, Card } from "antd"
const IndexPage = ({ data }) => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site</p>
    <p>Now go build something great.</p>
    <Row gutter={{ xs: 8, sm: 16 }}>
      {data.allStrapiArticle.edges.map(document => (
        <Col xs={24} sm={12}  md={8} lg={6} key={document.node.id}>
          <Card className='article-wrapper'>
              <h2>
                  <Link to={`/articles/${document.node.id}`}>{document.node.title}</Link>
              </h2>
              <Img fixed={document.node.image.childImageSharp.fixed} />
              <ReactMarkdown
                source={document.node.content.substring(0, 100).concat("...")}
                escapeHtml={false}
                transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                className="articleContent"
              />

              <Link to={`/articles/${document.node.id}`}>Read more</Link>
          </Card>
        </Col>
      ))}
    </Row>
    <Link to="/contact">Go to contact</Link>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`  
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          title
          content
        }
      }
    }
  }
`