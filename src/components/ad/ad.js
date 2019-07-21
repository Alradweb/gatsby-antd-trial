import React from 'react'
import styles from './app-ad.module.css'
import ad1 from '../../../static/ad-horizontal.jpg'
const Ad = (props) =>{
  return(
    <div className={styles.adWrapper}>
      {/*<img src={'ad-horizontal.jpg'} alt={'ad'}/>*/}
      <img src={ad1} alt={'ad'}/>
    </div>
  )
}
export default Ad