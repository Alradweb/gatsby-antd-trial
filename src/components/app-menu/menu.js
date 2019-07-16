import React, { useRef, useState } from "react"
import classes from "./app-menu.module.css"
import { Layout, Menu, Icon } from "antd"
//import { Link as GatsbyLink} from "@reach/router"
import styles from "./app-menu.module.css"
import Media from "react-media"
import { Link as GatsbyLink} from "gatsby"
const { Header } = Layout
// if (typeof window !== `undefined`) {
//   var Media = require("react-media").default
// }

// const GatsbyLink = props => (
//   <Link
//     {...props}
//     getProps={(props) => {
//
//       return {
//         style: {
//           border: props.isCurrent ? "3px solid white" : "1px solid black",
//         },
//       }
//     }}
//   />
// )


const DesktopMenu = ({ menuLinks, currentPath }) => {
 // let [itemKey, changeKey] = useState(1)

  return (
    <Header>
      <div className={styles.logo}/>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[`${currentPath}`]}
        //onClick={(e)=> changeKey(itemKey = e.key)}
        //selectedKeys={[`${itemKey}`]}
        style={{ lineHeight: "64px" }}
      >
        {menuLinks.map(({ link, name }) => {
          return <Menu.Item key={link}><GatsbyLink to={`${link}`}>{name.toUpperCase()}</GatsbyLink></Menu.Item> //activeClassName={styles.activeLink}
        })}
      </Menu>
    </Header>
  )
}


const MobileMenu = ({ menuLinks, currentPath }) => {
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
          defaultSelectedKeys={[`${currentPath}`]}
          // selectedKeys={[`${currentLocation(menuLinks, location)}`]}
          theme="dark"
          onClick={function({ item, key, keyPath, domEvent }) {
            //console.log(item, key, keyPath, domEvent)

          }}
        >
          {menuLinks.map(({ link, name }) => {
            return (
              <Menu.Item key={link}>
                <Icon type="pie-chart"/>
                <span>{name.toUpperCase()}</span>
                <GatsbyLink to={link}/>
              </Menu.Item>
            )
          })}
        </Menu>

      </div>
    </>
  )
}


const AppMenu =(props) =>{
  console.log('menu-props--', props)
  return <Media query="(max-width: 599px)">
    {matches =>
      matches ? (
        <MobileMenu menuLinks={props.menuLinks} currentPath={props.currentPath}/>
      ) : (
        <DesktopMenu menuLinks={props.menuLinks} currentPath={props.currentPath}/>
      )
    }
  </Media>
}


export default AppMenu