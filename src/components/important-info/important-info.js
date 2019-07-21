import React from 'react'
import styles from './important-info.module.css'
import test from '../../../static/img-horizontal.jpg'
const ImportantInfo = (props) =>{
  return(
    <div className={styles.importantInfoWrapper}>
      <img src={test} alt={'important'} width={1300} className={styles.image}/>
    </div>
  )
}
export default ImportantInfo