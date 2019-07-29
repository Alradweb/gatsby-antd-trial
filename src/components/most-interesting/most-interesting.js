import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import styles from "./app-most-interesting.module.css"
import sky from "../../../static/sky.jpg"
import { Row, Col, Card } from "antd"
import Img from "gatsby-image"
import Social from "../social/social"

const InterestingArticle = (props) => {
  return (
    <Col xs={{ span: 24 }} sm={{ span: 6 }} className={styles.container}>
      <Card bordered={false}
            cover={<Img fluid={props.fluid}/>}
            bodyStyle={{padding: '8px', textAlign: 'center', display: 'flex'}}
      >
        <Social color='dark' customStyle={{margin: '0 auto'}}/>
      </Card>
      {/*<Social color='dark'/>*/}
      <h3>
        <Link to={`/articles/${props.id}`}>{props.title}</Link>
      </h3>
    </Col>
  )
}

const MostInteresting = () => {
  return (<StaticQuery
    query={graphql`
      query  {
        allStrapiArticle {
    edges {
      node {
        title
        id
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
  `}
    render={data => {
      const articles = data.allStrapiArticle.edges.slice(1, 5)
      return (
        <section className={styles.mostInteresting} style={{ backgroundImage: `url(${sky})` }}>
          <Row className={styles.row}>
            <h2 className='section-title-light'>САМОЕ ИНТЕРЕСНОЕ</h2>
            <div className={styles.wrapper}>
            {
              articles.map((a, idx) => {
                const title = idx === 1 ? "Скачать стоковое фото ночное звездное небо ✓ популярный фотобанк ✓ доступные цены ✓ миллионы роялти-фри фотографий, изображений и ..." : a.node.title
                return <InterestingArticle
                  key={a.node.id}
                  title={title}
                  id={a.node.id}
                  fluid={a.node.image.childImageSharp.fluid}
                />
              })
            }
            </div>
          </Row>
        </section>
      )
    }}
  />)
}
export default MostInteresting