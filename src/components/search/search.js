import React from 'react'
import styles from './app-search.module.css'
import { Icon } from "antd"

const Search = (props) =>{
  return(
    <div className={styles.searchWrap}>
      <div className={styles.search} title="Поиск по сайту...">
        <Icon type="search" />
      </div>
      <div className={styles.searchField}>
        <form  id="cse-search-box">
          <input type="hidden" name="cx" value="partner-pub-xxx:xxx"/>
          <input type="hidden" name="cof" value="FORID:10"/>
          <input type="hidden" name="ie" value="UTF-8"/>
          <input type="text" name="q" placeholder="Поиск по сайту..."/>
        </form>
      </div>
    </div>
  )
}
export default Search