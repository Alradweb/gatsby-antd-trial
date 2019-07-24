import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
//import ReactMarkdown from "react-markdown"
import { Col, Row, Card, Icon } from "antd"
import { randomArticles } from "../../utils"
import styles from './app-articles-prev.module.css'

const { Meta } = Card
const PrevArticle = (props) => {
  console.log(props.test)
  return (
    <Col xs={{ span: 24}} sm={{ span: props.span}} className={styles.articlePrev}>
      <div className={styles.wrapper}>
      <div className={styles.overlay}
           style={{ backgroundImage: "url(https://res.cloudinary.com/hzekpb1cg/image/upload/c_fill,h_410,w_800,f_auto/s3/public/prod/2019-02/Paris.jpg)" }}>
        <div className="item-title-content">

          <h3><a href="#">{props.title}</a></h3>

          <div className="item-social">
            <div className="item-comments" title="Количество комментариев">
              <i className="fa fa-comments"></i><a href="#disqus_thread" className="item-comments-count">26</a>
            </div>
            <div title="Поделиться в соц. сетях"><Icon type="share-alt"/></div>
            <div className="likely likely-custom" data-url="path"
                 data-title="Новые смартфоны покорили поклонников мобильной индустрии">
            </div>
          </div>

        </div>
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
        return (
          <section>
            <Row>
              {
                randomArticles(data.allStrapiArticle.edges).map((article, idx )=> {
                  const span = idx < 2 ? 12 : 8
                  return (
                    <PrevArticle title={article.node.title} id={article.node.id} test={article} span={span} key={article.node.id}/>
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

