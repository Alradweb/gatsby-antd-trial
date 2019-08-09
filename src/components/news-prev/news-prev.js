import React, { useState } from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import { Col, Row } from "antd"
import styles from "./app-news-prev.module.css"
import ReactMarkdown from "react-markdown"
import ImportantInfo from "../important-info/important-info"

const NewsWidget = ({news}) =>{
  return(
    <Row>
      <h3 className={styles.widgetTitle}>Новости</h3>
      {
        news.map(n =>{
          return(
            <Col xs={{span: 24}} key={n.node.id} className={styles.widgetColumn}>
              <Row className={styles.widgetWrap}>
                <Col xs={{span: 8}} className={styles.widgetDate}>
                  <time dateTime={n.node.readerDate}>{n.node.date}</time>
                </Col>
                <Col xs={{span: 16}} className={styles.widgetText}>
                  <p>{n.node.title}</p>
                </Col>
              </Row>
            </Col>
          )
        })
      }
    </Row>
  )
}

const NewPrev = (props) => {
  const [isLongNew, changeState] = useState(false)
  return (
    <Col  xs={{ span: 24 }} md={{ span: 12 }} className={styles.newPrev}>
      <div className={styles.container} style={{ backgroundImage: `url(${props.imgSrc})` }}>
        <div className={styles.overlay}>
          <Link to={`/news/${props.path}`}>
            <ReactMarkdown
              source={props.content}
              allowedTypes={["text", "paragraph", "heading"]}
              allowNode={(node, index) => {
                if (index > 1) {
                  changeState(true)
                  return false
                } else return true
              }}
              escapeHtml={false}
            />
          </Link>
          <div className={styles.newsFooter}>
            <time className={styles.date} dateTime={props.newsDate[1]}>{props.newsDate[0]}</time>
            {isLongNew ? <span style={{ color: "#ec1c1c" }}>Читать далее...</span> : null}
          </div>
        </div>
      </div>
    </Col>
  )
}
const NewsPrev = (props) => {
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
        readerDate: date(formatString: "YYYY-MM-DD" )
        title
        customPath
        image {
         childImageSharp {
            fluid(maxWidth: 960, maxHeight: 600) {
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
        const news = data.allStrapiNewsarticle.edges.slice(-4)
        // console.log(data)
        if(props.widget) return <NewsWidget news={news}/>
          return (
          <section className={styles.newsPrev}>
            <h2 className='section-title-red'>НОВОСТИ</h2>
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <Row>
                  {
                    news.map((n) => {
                      return <NewPrev key={n.node.id}
                                      id={n.node.id}
                                      path={n.node.customPath}
                                      title={n.node.title}
                                      content={n.node.content}
                                      imgSrc={n.node.image.childImageSharp.fluid.src}
                                      newsDate={[n.node.date, n.node.readerDate]}/>
                    })
                  }
                </Row>
              </Col>
              <Col  xs={{ span: 24 }} md={{ span: 8 }}>
                <ImportantInfo cube/>
                <ImportantInfo horizontal/>
              </Col>
            </Row>
          </section>
        )
      }}
    />
  )
}

export default NewsPrev