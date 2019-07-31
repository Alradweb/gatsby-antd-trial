import React from 'react'
import styles from './app-show-more.module.css'
import { Link } from "gatsby"

const ShowMore = () =>{
  return (
    <section className={styles.showMore}>
      <div>
        <Link to={'/articles'}>
          <span className={styles.button}>ПОКАЗАТЬ ЕЩЁ</span>
        </Link>
      </div>
    </section>
  )
}
export default ShowMore