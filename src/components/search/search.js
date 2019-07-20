import React, { useEffect, useRef, useState } from "react"
import styles from './app-search.module.css'
import { Icon } from "antd"

const Search = ({searchToggle}) =>{
  const [open, toggle] = useState(false)
  const input = useRef(null)
  // const getOpen =()=> open
  // const onClickHandler = (e) =>{
  //
  //    if(getOpen() && e.target !== input.current ){
  //      toggle(false)
  //    }else return
  // }
  // useEffect(() => {
  //     window.addEventListener('click', onClickHandler)
  //   return () => {
  //     window.removeEventListener('click', onClickHandler)
  //   }
  // })
  return(
    <div className={styles.searchWrap}>

      {/*<div className={search ? styles.searchFieldOpen : styles.searchField }>*/}
      <div className={open ? styles.searchFieldOpen : styles.searchField }>
        <form  id="cse-search-box">
          <input type="hidden" name="cx" value="partner-pub-xxx:xxx"/>
          <input type="hidden" name="cof" value="FORID:10"/>
          <input type="hidden" name="ie" value="UTF-8"/>
          <input ref={input} type="text" name="q" placeholder={`Поиск по сайту...`}/>
        </form>
      </div>
      <div onClick={()=> {
        searchToggle && searchToggle(!open)
        toggle(!open)
        //console.log('click2', open)
      }} className={styles.search} title="Поиск по сайту...">
        <Icon type="search" />
      </div>
    </div>
  )
}
export default Search