import React, { useState } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
//import ReactMarkdown from "react-markdown"
import { Col, Row, Icon } from "antd"
import styles from "./app-news-prev.module.css"
import ReactMarkdown from "react-markdown"

const NewPrev = (props) => {
  const [isLongNew, changeState] = useState(false)
  return (
    <Col span={12} className={styles.newPrev}>
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
      {/*<h3>{props.title}</h3>*/}
      {/*<p>{props.content}</p>*/}
      {/*<p>{props.newsDate}</p>*/}
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