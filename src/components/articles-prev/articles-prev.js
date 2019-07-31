import React from "react"
import { Link, navigate} from "gatsby"
//import ReactMarkdown from "react-markdown"
import { Col, Row} from "antd"
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
      <div className={props.minSize ? styles.minContainer : styles.container}
           style={{ backgroundImage: `url(${props.imgSrc})` }}>
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
  const articles = props.specialArticles ? props.specialArticles : props.articles.slice(-(props.columns))
  return (
    <div className={styles.articlesPrev} >
      <Row>
        {
          articles.map((article, idx) => {
            let span = 24
            if(props.columns === 5){
              span = idx < 2 ? 12 : 8
            }
            if(props.columns === 4){
              span = 12
            }
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
    </div>
  )

}

export default withArticles(ArticlesPrev)

