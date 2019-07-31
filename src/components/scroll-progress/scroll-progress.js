import React, { useEffect, useRef } from "react"
import styles from "./scroll-progress.module.css"
import { connect } from "react-redux"
import { getWidth } from "../../utils"

const ScrollProgress = ({ _window }) => {
  if (!_window.isWindow || getWidth() < 768) {
    return null
  } else {
    const bar = useRef(null)
    const onScrollHandler = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      if (bar && bar.current) bar.current.style.width = scrolled + "%"
    }
    useEffect(() => {
      window.addEventListener("scroll", onScrollHandler)
      return () => {
        window.removeEventListener("scroll", onScrollHandler)
      }
    })
    return (
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} ref={bar}/>
      </div>
    )
  }
}
const mapStateToProps = ({ _window }) => {
  return {
    _window,
  }
}

export default connect(mapStateToProps)(ScrollProgress)