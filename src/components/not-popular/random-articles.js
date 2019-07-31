import React from "react"
import styles from "./app-random-articles.module.css"
import { Row, Col, Card } from "antd"
import ArticlesPrev from "../articles-prev/articles-prev"
import withArticles from "../withArticles"
import { randomArticles } from "../../utils"
import Social from "../social/social"
import { Link, navigate } from "gatsby"
import Img from "gatsby-image"

const RandomArticle = ({ article }) => {
  return (
    <div className={styles.container}>
      <div onClick={() => navigate(`/articles/${article.node.id}`)}>
        {/*<img className={styles.img} src={article.node.image.childImageSharp.fluid.src} alt={"good image"}/>*/}
        <Card bordered={false}
              cover={<Img fluid={article.node.fluidImage.childImageSharp.fluid}/>}
              bodyStyle={{ display: "flex", padding: "8px", textAlign: "center", overflow: "hidden" }} />
      </div>
      <div className={styles.content}>
        <Social color='dark' customStyle={{marginBottom: '8px'}}/>
        <Link to={`/articles/${article.node.id}`}>
          <h3 className={styles.title}>
            {article.node.title.toUpperCase() + "Поскольку контент управляется Strapi, авторы могут писать статьи через приятный пользовательский интерфейс, и разработчикам нужно только перестроить блог Gatsby, чтобы обновить контент."}
          </h3>
        </Link>
      </div>

    </div>
  )
}
const RandomArticles = (props) => {
  const randArticles = randomArticles(props.articles, 3)
  const [one, ...articles] = randArticles
  console.log(one, "---", articles)
  return (
    <section className={styles.randomArticles}>
      <h2 className='section-title-red'>СЛУЧАЙНЫЕ СТАТЬИ</h2>
      <Row className={styles.row}>
        <Col xs={{ span: 24 }} md={{ span: 14 }} className={styles.randomWrap}>
          <RandomArticle article={one}/>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 10 }} className={styles.colWrap}>
          <ArticlesPrev columns={2} minSize specialArticles={articles}/>
        </Col>
      </Row>
    </section>
  )
}
export default withArticles(RandomArticles)