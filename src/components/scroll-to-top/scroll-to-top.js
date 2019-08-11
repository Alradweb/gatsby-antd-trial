import React, { useRef } from "react"
import { connect } from "react-redux"
import styles from "./app-scroll-to-top.module.css"
import { Icon } from "antd"

const ScrollToTop = ({ _window }) => {
    const btn = useRef(null)
    if (!_window.isWindow) {
        return null
    } else {
        const scroll = () => {
            if (
                document.body.scrollTop > 300 ||
                document.documentElement.scrollTop > 300
            ) {
                btn.current.style.display = "block"
            } else {
                btn.current.style.display = "none"
            }
        }
        window.onscroll = function() {
            scroll()
        }

        const toTop = () => {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        }
        return (
            <button
                onClick={() => toTop()}
                ref={btn}
                title="В начало"
                className={styles.btn}
            >
                <Icon type="up" />
            </button>
        )
    }
}

const mapStateToProps = ({ _window }) => {
    return {
        _window,
    }
}

export default connect(mapStateToProps)(ScrollToTop)
