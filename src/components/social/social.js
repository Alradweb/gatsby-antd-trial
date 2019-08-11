import React from "react"
import styles from "./app-social.module.css"
import { Icon } from "antd"
import AppLikely from "../likely/likely"

const Social = props => {
    return (
        <div className={styles.social} style={props.customStyle}>
            <Icon className={styles.icon} type="eye" />
            <b className={styles.eye}>{Math.ceil(Math.random() * 100)}</b>
            <Icon className={styles.icon} type="share-alt" />
            <AppLikely color={props.color} />
        </div>
    )
}
export default Social
