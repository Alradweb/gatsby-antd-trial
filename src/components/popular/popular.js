import React from 'react'
import styles from './app-popular.module.css'
import { Row, Col } from "antd"
import ArticlesPrev from "../articles-prev/articles-prev"
import ImportantInfo from "../important-info/important-info"

const Popular = () =>{
  return(
    <section className={styles.popular}>
      <h2 className='section-title-red'>ПОПУЛЯРНЫЕ СТАТЬИ</h2>
       <Row>
         <Col xs={{span: 24}} md={{span: 16}} >
           <ArticlesPrev columns={4} minSize />
         </Col>
         <Col xs={{span: 24}} md={{span: 8}}>
           <ImportantInfo vertical/>
         </Col>
       </Row>
    </section>
  )
}
export default Popular