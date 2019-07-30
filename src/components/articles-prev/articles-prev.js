import React from "react"
import { Link, navigate} from "gatsby"
//import ReactMarkdown from "react-markdown"
import { Col, Row} from "antd"
//import { randomArticles } from "../../utils"
import styles from "./app-articles-prev.module.css"
import Social from "../social/social"
import withArticles from "../withArticles"

const PrevArticle = (props) => {

  //console.log(props)
  return (
    <Col xs={{ span: 24 }}
         sm={{ span: props.span }}
         className={styles.articlePrev}
         onClick={() => navigate(`/articles/${props.id}`)}
    >
      <div className={props.minSize ? styles.minContainer : styles.container} style={{ backgroundImage: `url(${props.imgSrc})` }}>
        <div className={styles.content}>
          <div className={styles.text}>
            <Link to={`/articles/${props.id}`}>
              <h3>{props.title.toUpperCase()}</h3>
            </Link>
          </div>
          <Social color='light'/>
        </div>
      </div>
    </Col>
  )
}


const ArticlesPrev = (props) => {
  //console.log("ArticlesPrev--", props)
  const numberOfArticles =  props.articles.slice(-(props.columns))
  return (
    <section className={styles.articlesPrev} >
      <Row>
        {
          numberOfArticles.map((article, idx) => {
            let span = 1
            if(props.columns === 5){
              span = idx < 2 ? 12 : 8
            }else if(props.columns === 4){
              span = 12
            }else span = 1
            return (
              <PrevArticle title={article.node.title}
                           id={article.node.id}
                           span={span}
                           key={article.node.id}
                           imgSrc={article.node.image.childImageSharp.fluid.src}
                           minSize={props.minSize || null}
              />
            )
          })
        }
      </Row>
    </section>
  )

}

export default withArticles(ArticlesPrev)

