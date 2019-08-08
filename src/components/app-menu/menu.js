import React, { useCallback, useRef } from "react"
import { connect } from "react-redux"
import { Layout, Menu, Icon } from "antd"
import styles from "./app-menu.module.css"
import Media from "react-media"
import { Link as GatsbyLink } from "gatsby"
import Search from "../search/search"
import * as actions from "../../redux/actions/menu"
import { addActiveStyle } from "../../utils"

const { Header } = Layout

const LowerMenu = ({ menuLinks, currentPath }) => {
  return (
    <nav style={{ borderBottom: "1px solid rgba(255,255,255,.6)" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[`${currentPath}`]}
        style={{ lineHeight: "64px" }}
      >
        {menuLinks.map(({ link, name }) => {
          const resolveAllMatches = currentPath.indexOf(name) > -1 ? currentPath : link
          return <Menu.Item key={resolveAllMatches} style={{ backgroundColor: "transparent" }}>
            <GatsbyLink
              activeClassName={styles.activeLink} to={resolveAllMatches}>
              {name.toUpperCase()}
            </GatsbyLink>
          </Menu.Item> //activeClassName={styles.activeLink}
        })}
      </Menu>
    </nav>
  )
}
const DesktopMenu = ({ menuLinks, currentPath }) => {
  //console.log("menu-props--", currentPath)
  const navRef = useCallback(node => {
    if (node !== null) {addActiveStyle(node)}
  }, [])
  return (
    <Header className={styles.desktopHeader}>
      <div className={styles.logoWrapper}>
        <GatsbyLink to={"/"}>
          <span className={styles.logo}>{`LO\u0307\u0323GO`}</span>
        </GatsbyLink>
      </div>
      <nav ref={navRef}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[`${currentPath}` ]}
          // selectedKeys={[`/articles/2`]}
          style={{ lineHeight: "64px" }}
        >
          {menuLinks.map(({ link, name }) => {
            const resolveAllMatches = currentPath.indexOf(name) > -1 ? currentPath : link
            return <Menu.Item key={resolveAllMatches} style={{ backgroundColor: "transparent" }}>
              <GatsbyLink to={resolveAllMatches} activeClassName={styles.activeLink}>
                {name.toUpperCase()}
              </GatsbyLink>
            </Menu.Item> //activeClassName={styles.activeLink}
          })}
        </Menu>
      </nav>
      <Search/>
    </Header>
  )
}


const MobileMenu = ({ menuLinks, currentPath, menu, toggleSearch, closeMenu, toggleMenu }) => {
  //console.log(menuLinks)
  const { menuIsOpen, searchIsOpen } = menu
  const sidebar = useRef(null)
  const menuButton = useRef(null)
  const openNav = () => {
    toggleSearch(false)
    sidebar.current.style.width = "250px"
    menuButton.current.style.marginLeft = "250px"
    addActiveStyle(sidebar.current, true)
  }
  const closeNav = () => {
    if (!menuIsOpen) return
    sidebar.current.style.width = "0"
    menuButton.current.style.marginLeft = "0"
  }
  const closedMenuContent = (
    <>
      {!menuIsOpen && <div className={searchIsOpen ? styles.logoMobileClose : styles.logoMobile}><GatsbyLink
        to={"/"}>{`LO\u0307\u0323GO`}</GatsbyLink></div>}
      <Search/>
    </>
  )
  return (
    <header style={{ marginBottom: "8px" }}>
      <div ref={menuButton} className={menuIsOpen ? styles.menuButtonOpen : styles.menuButton}>
        <Icon
          className={menuIsOpen ? styles.triggerOpen : styles.trigger}
          type={!menuIsOpen ? "menu-unfold" : "menu-fold"}
          onClick={() => {

            menuIsOpen ? closeNav() : openNav()
            toggleMenu(!menuIsOpen)
          }}
        />
        {menuIsOpen ? null : closedMenuContent}
      </div>

      <nav className={styles.sidebar} ref={sidebar} onClick={() => {
        closeNav()
        closeMenu()
      }}>

        <Menu
          defaultSelectedKeys={[`${currentPath}`]}
          theme="dark"
          // onClick={function({ item, key, keyPath, domEvent }) {console.log(item, key, keyPath, domEvent)}}
        >
          {menuLinks.map(({ link, name, icon }) => {
            const resolveAllMatches = currentPath.indexOf(name) > -1 ? currentPath : link
            return (
              <Menu.Item key={resolveAllMatches} style={{ backgroundColor: "transparent" }}>
                <Icon type={icon} />
                <span>{name.toUpperCase()}</span>
                <GatsbyLink to={resolveAllMatches}/>
              </Menu.Item>
            )
          })}
        </Menu>
      </nav>
    </header>
  )
}


const AppMenu = (props) => {
console.log(props.currentPath)
  if (props.lower) return <LowerMenu menuLinks={props.menuLinks} currentPath={props.currentPath}/>
  if (!props._window.isWindow) return <DesktopMenu menuLinks={props.menuLinks} currentPath={props.currentPath}/>
  return <Media query="(max-width: 599px)">
    {matches =>
      matches ? (
        <MobileMenu menuLinks={props.menuLinks}
                    currentPath={props.currentPath}
                    menu={props.menu}
                    openMenu={props.openMenu}
                    closeMenu={props.closeMenu}
                    toggleMenu={props.toggleMenu}
                    toggleSearch={props.toggleSearch}
        />
      ) : (
        <DesktopMenu menuLinks={props.menuLinks} currentPath={props.currentPath}/>
      )
    }
  </Media>
}
const mapStateToProps = ({ menu, _window }) => {
  return {
    menu,
    _window,
  }
}

export default connect(mapStateToProps, actions)(AppMenu)