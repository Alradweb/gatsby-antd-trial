import React, { useRef } from "react"
import styles from "./scroll-progress.module.css"

const ScrollProgress = ({ isWindow }) => {
  if (!isWindow) {
    return null
  } else {
    const bar = useRef(null)
    const onScrollHandler = () => {
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop
      let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      let scrolled = (winScroll / height) * 100
      bar.current.style.width = scrolled + "%"
    }
    window.onscroll = () => onScrollHandler()
    return (
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} ref={bar}/>
      </div>
    )
  }
}
export default ScrollProgress