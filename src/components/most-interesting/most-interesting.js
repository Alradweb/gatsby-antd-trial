import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import styles from "./app-most-interesting.module.css"
import sky from "../../../static/sky.jpg"
import { Row, Col, Card } from "antd"
import Img from "gatsby-image"
import Social from "../social/social"
import Media from "react-media"

const InterestingArticle = (props) => {
  return (

    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }} className={styles.container}>

        <Card bordered={false}
              cover={<Img fluid={props.fluid}/>}
              bodyStyle={{ display: "flex", padding: "8px", textAlign: "center", overflow: "hidden" }}
        >
          <Media query="(min-width: 992px)">
            {matches =>
              matches ? (
                <Social color='dark' customStyle={{ margin: "0 auto" }}/>
              ) : (
                <Social color='dark' customStyle={{ margin: "0 auto 0 0" }}/>
              )
            }
          </Media>
        </Card>
        <Link to={`/articles/${props.id}`}>
          <h3 className={styles.title}>
            {props.title}
          </h3>
        </Link>

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

            {
              articles.map((a, idx) => {
                return <InterestingArticle
                  key={a.node.id}
                  title={a.node.title}
                  id={a.node.id}
                  fluid={a.node.image.childImageSharp.fluid}
                />
              })
            }

          </Row>
        </section>
      )
    }}
  />)
}
export default MostInteresting


