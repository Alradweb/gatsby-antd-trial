import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../containers/app-layout"
import Img from "gatsby-image"
import { Col, Row, Card } from "antd"
import ImportantInfo from "../components/important-info/important-info"
import ReactMarkdown from "react-markdown"
import styles from './styles/app-articles.module.css'
import NewsPrev from "../components/news-prev/news-prev"


const IndexPage = ({ data }) => {
  //console.log(data.allStrapiArticle.edges)
  const articles = data.allStrapiArticle.edges
  //const articles = data.allStrapiArticle.edges.slice(-1)
  return (
    <Layout>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 16 }} className={styles.articlesContainer}>
          <h1>ВСЕ СТАТЬИ:</h1>
          <ul className={styles.articlesList}>
            {
              articles.map( (a, idx) =>{
                const lastItem = articles.length === idx + 1 || null
                return(
                  <li className={styles.articlesItem} key={a.node.id} style={lastItem && {border: 'none'}}>
                    <Link to={`/articles/${a.node.customPath}`}>
                    <Row>
                      <Col xs={{ span: 12 }} className={styles.imageContainer}>
                        <Card bordered={false}
                              cover={<Img fluid={a.node.image.childImageSharp.fluid}/>}
                          // bodyStyle={{padding: "8px", overflow: "hidden" }}
                        >
                        </Card>
                      </Col>
                      <Col xs={{ span: 12 }} className={styles.articlesText}>
                        <h3 className={styles.articlesTitle}>{a.node.title}</h3>
                        <ReactMarkdown
                          source={a.node.content.substring(0, 200).concat("...")}
                          allowedTypes={["text", "paragraph"]}
                          allowNode={(node, index) => !index}
                          escapeHtml={false}
                        />
                      </Col>
                    </Row>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <ImportantInfo vertical/>
          <NewsPrev widget/>
        </Col>
      </Row>
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
          customPath
          title
          content
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


//   <Col xs={{ span: 24 }} md={{ span: 16 }} key={document.node.id}>
//   <h1>Все статьи</h1>
// <Card title={document.node.title}
//       bordered={false}
//       className='article-wrapper'
//       extra={<Link to={`/styles/${document.node.id}`}>Больше</Link>}
//       cover={<Img fluid={document.node.image.childImageSharp.fluid}/>}
//
// >
//   <Link to={`/styles/${document.node.id}`}>{document.node.title}</Link>
//   <Meta
//     // title={data.site.siteMetadata.title}
//     description={<p>{document.node.content.substring(0, 100).concat("...")}</p>}
//
//   />
//   <Link to={`/styles/${document.node.id}`}>Read more</Link>
// </Card>
// </Col>