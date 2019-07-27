import React, { useState } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
//import ReactMarkdown from "react-markdown"
import { Col, Row, Icon } from "antd"
import styles from "./app-news-prev.module.css"
import ReactMarkdown from "react-markdown"
import Img from "gatsby-image"

const NewPrev = (props) => {
  const [isLongNew, changeState] = useState(false)
  return (
    <Col span={12} className={styles.newPrev}>
      {/*<div className={styles.container} style={{ backgroundImage: `url(${props.imgSrc})`}}>*/}
      <div>
      <ReactMarkdown
        source={props.content}
        allowedTypes={['text', 'paragraph', 'heading']}
        allowNode={(node, index)=>{
          if(index > 1){
            changeState(true)
            return false
          }else return true
        }}
        escapeHtml={false}
      />
      {isLongNew ? <p style={{color: 'tomato'}}>'Читать далее...'</p> : null}
        <Img fluid={props.imgSrc} />
      {/*<h3>{props.title}</h3>*/}
      {/*<p>{props.content}</p>*/}
      {/*<p>{props.newsDate}</p>*/}
      </div>
    </Col>
  )
}
const NewsPrev = () => {

  return (
    <StaticQuery
      query={graphql`
      query  {
        allStrapiNewsarticle {
    edges {
      node {
        id
        content
        date(formatString: "DD.MM.YYYY")
        title
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
        const length = data.allStrapiNewsarticle.edges.length
        const news = data.allStrapiNewsarticle.edges.slice(length - 4)
        //const news = [...data.allStrapiNewsarticle.edges[2]]
        console.log(data)
        return (
          <section className={styles.newsPrev}>
            <h2>НОВОСТИ</h2>
            <Row>
              <Col span={16}>
                <Row>
                {
                  news.map((n) => {
                    return <NewPrev key={n.node.id}
                                    id={n.node.id}
                                    title={n.node.title}
                                    content={n.node.content}
                                    imgSrc={n.node.image.childImageSharp.fluid}
                                    newsDate={n.node.date}/>
                  })
                }
                </Row>
              </Col>
              <Col span={8}>col-8</Col>
            </Row>
          </section>
        )
      }}
    />
  )
}

export default NewsPrev