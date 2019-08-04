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
    >
      <div className={props.minSize ? styles.minContainer : styles.container}
           style={{ backgroundImage: `url(${props.imgSrc})` }}
           onClick={(ev)=>{
            if(ev.target.tagName === 'DIV') navigate(`/articles/${props.path}`)
           }}
      >
        <div className={styles.content}>
          <div className={styles.text}>
            <Link to={`/articles/${props.path}`}>
              <h3>{props.title.toUpperCase()}</h3>
            </Link>
          </div>
          <Social color='light' />
        </div>
      </div>
    </Col>
  )
}

const ArticleLowerWidget = (props) =>{
  return(
    <div className={styles.lowerWidget}>
       <h3 className={styles.lowerWidgetTitle}>{'Читать еще:'}</h3>
       <ul className={styles.lowerWidgetList}>
         {
           props.articles.map(a =>{
             return (
               <li className={styles.lowerWidgetItem} key={a.node.id}>
                 <Link to={`/articles/${a.node.customPath}`}>
                   {a.node.title + 'Мы настоятельно не рекомендуем загружать файлы целиком, так как это приведет к увеличению размера вашего приложения и усложнит получение исправлений и обновлений'}
                 </Link>
               </li>
             )
           })
         }
       </ul>
    </div>
  )
}
const ArticlesPrev = (props) => {
  const articles = props.specialArticles ? props.specialArticles : props.articles.slice(-(props.columns))
  console.log(articles)
  if(props.lowerWidget) return <ArticleLowerWidget articles={articles}/>
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
                           path={article.node.customPath}
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
ArticlesPrev.defaultProps = {
  columns: 2
}
export default withArticles(ArticlesPrev)

