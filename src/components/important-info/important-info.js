import React from "react"
import styles from "./important-info.module.css"
import horizontal from "../../../static/img-horizontal.jpg"
import vertical from "../../../static/img-vertical.jpg"
import cube from "../../../static/img-cube.jpg"
const ImportantInfo = props => {
    const infoSize = props.horizontal
        ? horizontal
        : props.vertical
        ? vertical
        : cube
    return (
        <div
            className={
                props.horizontal
                    ? styles.horizontal
                    : props.vertical
                    ? styles.vertical
                    : styles.cube
            }
        >
            <img
                src={infoSize}
                alt={"important info"}
                className={styles.image}
            />
        </div>
    )
}
export default ImportantInfo
