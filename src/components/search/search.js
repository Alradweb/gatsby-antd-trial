import React, { useRef} from "react"
import {connect} from 'react-redux'
import styles from './app-search.module.css'
import { Icon } from "antd"
import * as actions from '../../redux/actions/menu'

const Search = ({menu, toggleSearch}) =>{
  const{searchIsOpen} = menu
  //console.log(toggleSearch)
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
      <div className={searchIsOpen ? styles.searchFieldOpen : styles.searchField }>
        <form  id="cse-search-box">
          <input type="hidden" name="cx" value="partner-pub-xxx:xxx"/>
          <input type="hidden" name="cof" value="FORID:10"/>
          <input type="hidden" name="ie" value="UTF-8"/>
          <input ref={input} type="text" name="q" placeholder={`Поиск по сайту...`}/>
        </form>
      </div>
      <div onClick={()=> {
        toggleSearch(!searchIsOpen)

        //console.log('click2', open)
      }} className={styles.search} title="Поиск по сайту...">
        <Icon type="search" />
      </div>
    </div>
  )
}

const mapStateToProps = ({menu}) =>{
  return {
    menu
  }
}
export default connect(mapStateToProps, actions)(Search)