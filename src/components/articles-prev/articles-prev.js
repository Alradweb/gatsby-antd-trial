import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
//import ReactMarkdown from "react-markdown"
import { Col, Row, Icon } from "antd"
import AppLikely from "../likely/likely"
//import { randomArticles } from "../../utils"
import styles from "./app-articles-prev.module.css"
import Social from "../social/social"

const PrevArticle = (props) => {
  //console.log(props)
  return (
    <Col xs={{ span: 24 }} sm={{ span: props.span }} className={styles.articlePrev}>
      <div className={styles.container} style={{ backgroundImage: `url(${props.imgSrc})`}}>
        <div className={styles.content}>
          <div className={styles.text}>
            <Link to={`/articles/${props.id}`}>
              <h3>{props.title.toUpperCase()}</h3>
            </Link>
          </div>
          <Social color='light'/>
          {/*<div className={styles.social}>*/}
          {/*  <Icon className={styles.icon} type="eye"/>*/}
          {/*  <b className={styles.eye}>{Math.ceil(Math.random() * 100)}</b>*/}
          {/*  <Icon className={styles.icon} type="share-alt"/>*/}
          {/*  <AppLikely/>*/}
          {/*</div>*/}
        </div>
      </div>
    </Col>
  )
}


const ArticlesPrev = () => {
  // console.log(props)
  // const {data} = props
  return (<StaticQuery
      query={graphql`
      query  {
        allStrapiArticle {
    edges {
      node {
        title
        id
        image {
          id
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  }
 }
  `}
      render={data => {
        const fiveArticles = data.allStrapiArticle.edges.slice(-5)
        return (
          <section className={styles.articlesPrev}>
            <Row>
              {
                fiveArticles.map((article, idx) => {
                  const span = idx < 2 ? 12 : 8
                  return (
                    <PrevArticle title={article.node.title}
                                 id={article.node.id}
                                 span={span}
                                 key={article.node.id}
                                 imgSrc={article.node.image.childImageSharp.fluid.src}
                    />
                  )
                })
              }
            </Row>
          </section>
        )
      }}
    />
  )
}

export default ArticlesPrev

