import React, { useRef, useState } from "react"
import classes from "./app-menu.module.css"
import Media from "react-media"
import { Layout, Menu, Icon } from "antd"
//import { Link } from "@reach/router"
import styles from "./app-menu.module.css"
import { Link} from "gatsby"

const { Header} = Layout
const currentLocation = (menuLinks, location) =>{
  const result =  menuLinks.find(({link}) => link === location)
  return result ? result.key : 0
}

const DesktopMenu = ({menuLinks, location}) => {
  return (
    <Header>
      <div className={styles.logo}/>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[`${currentLocation(menuLinks, location)}`]}
        style={{ lineHeight: "64px" }}
      >
        {menuLinks.map(({key, link, name}) =>{
          return <Menu.Item key={key}><Link to={link}>{name.toUpperCase()}</Link></Menu.Item>
        })}
      </Menu>
    </Header>
  )
}


const MobileMenu = ({menuLinks, location}) => {
  const sidebar = useRef(null)
  const menuButton = useRef(null)
  const [collapsed, toggle] = useState(true)
  const openNav = () => {
    sidebar.current.style.width = "250px"
    menuButton.current.style.marginLeft = "250px"
  }
  const closeNav = () => {
    sidebar.current.style.width = "0"
    menuButton.current.style.marginLeft = "0"
  }
  return (
    <>
      <div ref={menuButton} className={styles.menuButton}>
        <Header style={{ background: "transparent", padding: 0, height: "64px", width: "64px" }}>
          <Icon
            className={classes.trigger}
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={() => {
              collapsed ? openNav() : closeNav()
              toggle(!collapsed)
            }}
          />
        </Header>
      </div>

      <div className={classes.sidebar} ref={sidebar} onClick={() => {
        closeNav()
        toggle(!collapsed)
      }}>
        <Menu
          defaultSelectedKeys={[`${currentLocation(menuLinks, location)}`]}
          theme="dark"
          onClick={function({ item, key, keyPath, domEvent }) {
            //console.log(item, key, keyPath, domEvent)
           // console.log( 'location--', window.location.pathname)
          }}
        >
          {menuLinks.map(({key, link, name}) =>{
            return (
              <Menu.Item key={key}>
                <Icon type="pie-chart"/>
                <span>{name.toUpperCase()}</span>
                <Link to={link}/>
              </Menu.Item>
            )
          })}
        </Menu>

      </div>
    </>
  )
}

const AppMenu = ({menuLinks}) => {
  const location = window.location.pathname
  return (
    <>
      <Media query="(max-width: 599px)">
        {matches =>
          matches ? (
            <MobileMenu menuLinks={menuLinks} location={location}/>
          ) : (
            <DesktopMenu menuLinks={menuLinks} location={location}/>
          )
        }
      </Media>
    </>
  )
}


// export const query = graphql`
//   query AppMenu {
//     site {
//     siteMetadata {
//       title
//       language
//       menuLinks {
//         key
//         link
//         name
//       }
//     }
//   }
//  }
// `

export default AppMenu