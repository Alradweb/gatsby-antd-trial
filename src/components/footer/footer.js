import React from 'react'
import styles from './app-footer.module.css'
import {Icon} from "antd"

const Footer = (props) =>{
  return(
    <footer className={styles.footer}>
      {props.children}
      <div className={styles.footerContent}>
        <p>© {new Date().getFullYear()}, Сделано с  <Icon type="heart" style={{color: 'tomato'}}/></p>
        <p>Копирование контента и размещение на других сайтах запрещено.</p>
      </div>
    </footer>
  )
}
export default Footer