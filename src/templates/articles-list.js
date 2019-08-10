import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../containers/app-layout"
import Img from "gatsby-image"
import { Col, Row, Card } from "antd"
import ImportantInfo from "../components/important-info/important-info"
import ReactMarkdown from "react-markdown"
import NewsPrev from "../components/news-prev/news-prev"
import styles from './app-articles-list.module.css'
import Paginator from "../components/paginator/paginator"
import Helmet from "react-helmet"



const ArticlesList = (props) => {
  const { currentPage, numPages } = props.pageContext
  const articles = props.data.allStrapiArticle.edges
  //const articles = data.allStrapiArticle.edges.slice(-1)
  //console.log(articles, styles)
  return (
    <Layout>
      <Helmet title={'Список статей'}/>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 16 }} className={styles.articlesContainer}>
          <h1>ВСЕ СТАТЬИ:</h1>
          <ul className={styles.articlesList}>
            {
              articles.map( (a, idx) =>{
                const lastItem = articles.length === idx + 1 || null
                return(
                  <li className={styles.articlesItem} key={a.node.id} style={lastItem && {border: 'none'}}>
                    <Link to={`/articles/${a.node.customPath}`} aria-label={`Переход на страницу статьи ${a.node.title}`}>
                      <Row>
                        <Col xs={{ span: 24 }} md={{span: 12}} className={styles.imageContainer}>
                          <Card bordered={false}
                                cover={<Img fluid={a.node.image.childImageSharp.fluid}/>}
                                bodyStyle={{ padding: "8px" }}
                          >
                          </Card>
                        </Col>
                        <Col xs={{ span: 24 }} md={{span: 12}} className={styles.articlesText}>
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
      <Paginator currentPage={currentPage} numPages={numPages} pageName='articles'/>
    </Layout>

  )
}

export const query = graphql`
  query ArticlesList($skip: Int!, $limit: Int!) {
  allStrapiArticle(limit: $limit skip: $skip) {
    edges {
      node {
        id
        title
        content
        customPath
        image {
            childImageSharp {
              fluid(maxWidth: 960, maxHeight: 600) {
            ...GatsbyImageSharpFluid
              }
            }
          }
      }
    }
  }
}
`
export default ArticlesList
