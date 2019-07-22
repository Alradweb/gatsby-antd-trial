import React, { useEffect, useRef } from "react"
import styles from "./scroll-progress.module.css"
import { connect } from "react-redux"

const ScrollProgress = ({ _window }) => {
  //console.log('progress-', _window.isWindow)
  if (!_window.isWindow) {
    return null
  } else {
    const bar = useRef(null)
    const onScrollHandler = () => {
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop
      let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      let scrolled = (winScroll / height) * 100
      bar.current.style.width = scrolled + "%"
    }
    useEffect(() => {
      window.addEventListener('scroll', onScrollHandler)
      return () => {
        window.removeEventListener('scroll', onScrollHandler)
      }
    })
    return (
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} ref={bar}/>
      </div>
    )
  }
}
const mapStateToProps = ({_window}) =>{
  return {
    _window
  }
}

export default connect(mapStateToProps)(ScrollProgress)