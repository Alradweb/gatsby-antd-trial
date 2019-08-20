import React, { useRef } from "react"
import { connect } from "react-redux"
import styles from "./app-search.module.css"
import { Icon } from "antd"
import * as actions from "../../redux/actions/menu"

const Search = ({ menu, toggleSearch }) => {
    const { searchIsOpen } = menu
    const input = useRef(null)

    const setClickWatcher = ev => {
        ev.stopPropagation()
        if(input) input.current.focus()
        const onClickHandler = e => {
            if (e.target !== input.current) {
                toggleSearch(false)
                input && input.current.blur()
                window.removeEventListener("click", onClickHandler)
            }
        }
        window.addEventListener("click", onClickHandler)
    }

    return (
        <div className={styles.searchWrap}>
            <div
                className={
                    searchIsOpen ? styles.searchFieldOpen : styles.searchField
                }
            >
                <form id="cse-search-box">
                    <input
                        type="hidden"
                        name="cx"
                        value="partner-pub-xxx:xxx"
                    />
                    <input type="hidden" name="cof" value="FORID:10" />
                    <input type="hidden" name="ie" value="UTF-8" />
                    <input
                        ref={input}
                        type="search"
                        aria-label={'Поиск по сайту'}
                        name="q"
                        placeholder={`Поиск по сайту...`}
                    />
                </form>
            </div>
            <div
                onClick={ev => {
                    toggleSearch(!searchIsOpen)
                    setClickWatcher(ev)
                }}
                className={styles.search}
                title="Поиск по сайту..."
            >
                <Icon type="search" />
            </div>
        </div>
    )
}

const mapStateToProps = ({ menu }) => {
    return {
        menu,
    }
}
export default connect(
    mapStateToProps,
    actions
)(Search)
