import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../containers/app-layout"
import Img from "gatsby-image"
//import ReactMarkdown from "react-markdown"
import { Col, Row, Card} from "antd"

const { Meta } = Card

const IndexPage = ({ data }) =>{
    //console.log(data.allStrapiArticle.edges)
    return (
      <Layout>
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site</p>
          <p>Now go build something great.</p>
          <Row gutter={{ xs: 8, sm: 16 }}>
              {data.allStrapiArticle.edges.map(document => (
                <Col xs={24} sm={12}  md={8} lg={6} key={document.node.id} style={{marginBottom: '16px'}}>
                    <Card  title={document.node.title}
                           bordered={false}
                           className='article-wrapper'
                           extra={<Link to={`/articles/${document.node.id}`}>Больше</Link>}
                           cover={<Img fluid={document.node.image.childImageSharp.fluid} />}

                    >
                        <h2>
                            <Link to={`/articles/${document.node.id}`}>{document.node.title}</Link>
                        </h2>
                        {/*<Img fixed={document.node.image.childImageSharp.fixed} />*/}
                        {/*<Img fluid={document.node.image.childImageSharp.fluid} />*/}
                      <Meta
                        // title={data.site.siteMetadata.title}
                        description={<p>{document.node.content.substring(0, 100).concat("...")}</p>}

                      />

                        {/*<ReactMarkdown*/}
                        {/*  source={document.node.content.substring(0, 100).concat("...")}*/}
                        {/*  escapeHtml={false}*/}
                        {/*  transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}*/}
                        {/*  className="articleContent"*/}
                        {/*/>*/}

                        <Link to={`/articles/${document.node.id}`}>Read more</Link>
                    </Card>
                </Col>
              ))}
          </Row>
          <Link to="/contact">Go to contact</Link>
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
          image {
            childImageSharp {
              fluid(maxWidth: 960, maxHeight: 600) {
            ...GatsbyImageSharpFluid
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


// export const pageQuery = graphql`
//   query IndexQuery {
//     allStrapiArticle {
//       edges {
//         node {
//           id
//           image {
//             childImageSharp {
//               fixed(width: 200, height: 150) {
//                 ...GatsbyImageSharpFixed
//               }
//             }
//           }
//           title
//           content
//         }
//       }
//     }
//   }
// `