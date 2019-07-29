import React from 'react'
import styles from './app-popular.module.css'
import withArticles from "../withArticles"

const Popular = (props) =>{
  return(
    <section className={styles.popular}>
      Popular
    </section>
  )
}
export default withArticles(Popular)