import React from 'react'
import styles from './important-info.module.css'
import test from '../../../static/ad-horizontal.jpg'
const ImportantInfo = (props) =>{
  return(
    <div className={styles.importantInfoWrapper}>
      <img src={test} alt={'important'} width={1200} className={styles.image}/>
    </div>
  )
}
export default ImportantInfo