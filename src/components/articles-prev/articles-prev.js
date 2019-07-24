import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
//import ReactMarkdown from "react-markdown"
import { Col, Row, Card, Icon } from "antd"
import AppLikely from '../likely/likely'
import { randomArticles } from "../../utils"
import styles from "./app-articles-prev.module.css"


const { Meta } = Card
const PrevArticle = (props) => {
  console.log(props.test)
  return (
    <Col xs={{ span: 24 }} sm={{ span: props.span }} className={styles.articlePrev}>
      <div className={styles.container} style={{ backgroundImage: `url(${props.imgSrc})` }}>
        {/*<img src={props.imgSrc} alt="Avatar" className={styles.image} style={{width: '1200px'}}/>*/}
          <div className={styles.content}>
            <div className={styles.text}><Link to={`/articles/${props.id}`}><h3>{props.title}</h3></Link></div>
            <div className={styles.social}>
              <Icon className={styles.shareIcon} type="eye" />
              <b className={styles.eye}>{Math.ceil(Math.random() * 100)}</b>
              <Icon className={styles.shareIcon} type="share-alt"/>
              <AppLikely/>
            </div>
          </div>
      </div>
      {/*<div className={styles.wrapper}>*/}
      {/*  <div className={styles.overlay} style={{ backgroundImage: `url(${props.imgSrc})` }}>*/}
      {/*    <div className={styles.articlePrevContent}>*/}
      {/*      /!*<Link to={`/`}><h3>{props.title}</h3></Link>*!/*/}
      {/*      <h3><a href={'/'}>{props.title}</a></h3>*/}
      {/*      <div className="item-social">*/}
      {/*        <div className="item-comments" title="Количество комментариев">*/}
      {/*          <i className="fa fa-comments"></i><a href="#disqus_thread"*/}
      {/*                                               className="item-comments-count">{Math.ceil(Math.random() * 100)}</a>*/}
      {/*        </div>*/}
      {/*        <div title="Поделиться в соц. сетях"><Icon type="share-alt"/></div>*/}
      {/*        <div className="likely likely-custom" data-url="path"*/}
      {/*             data-title="Новые смартфоны покорили поклонников мобильной индустрии">*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
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
        return (
          <section>
            <Row>
              {
                randomArticles(data.allStrapiArticle.edges).map((article, idx) => {
                  const span = idx < 2 ? 12 : 8
                  return (
                    <PrevArticle title={article.node.title}
                                 id={article.node.id}
                                 test={article}
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

