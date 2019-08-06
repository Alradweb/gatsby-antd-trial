import React from 'react'
import { Link } from "gatsby"
import styles from './app-paginator.module.css'


const Paginator = (props) =>{
  console.log(props)
  const { currentPage, numPages, pageName } = props
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  return(
    <section className={styles.paginateWrapper}>
      {!isLast && (
        <Link to={`/${pageName}/${nextPage}`} className={styles.button} rel="next">
          Следующая страница »
        </Link>
      )}
      <ul className={styles.pagination}>
        <li>
          {!isFirst && (
            <Link to={`/${pageName}/${prevPage}`} rel="prev">
              ← Предыдущая страница
            </Link>
          )}
        </li>
        {Array.from({ length: numPages }, (_, i) => (
          <li key={`pagination-number${i + 1}`} >
            <Link to={`/${pageName}/${i === 0 ? "" : i + 1}`}>
              {i + 1}
            </Link>
          </li>
        ))}
        <li>
          {!isLast && (
            <Link to={`/${pageName}/${nextPage}`} rel="next">
              Следующая страница →
            </Link>
          )}
        </li>
      </ul>

    </section>
  )
}
export default Paginator