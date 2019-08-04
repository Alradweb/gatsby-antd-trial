import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../containers/app-layout"
//import Img from "gatsby-image"
import { Col, Row, Card } from "antd"
import ImportantInfo from "../components/important-info/important-info"



const IndexPage = ({ data }) => {
  //console.log(data.allStrapiArticle.edges)
  const articles = data.allStrapiArticle.edges
  return (
    <Layout>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 16 }} >
          {
            articles.map( a =>{
              return(
                <Row key={a.node.id}>
                  <Col xs={{ span: 12 }}>
                    <Link to={`/articles/${a.node.customPath}`}>{a.node.title}</Link>
                  </Col>
                  <Col xs={{ span: 12 }}>
                    {/*<p>{a.node.content.substring(0, 100).concat("...")}</p>*/}
                    <p>{a.node.content}</p>
                  </Col>
                </Row>
              )
            })
          }
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <ImportantInfo vertical/>
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