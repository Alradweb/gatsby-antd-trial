import React, { useRef, useState } from "react"
import classes from "./app-menu.module.css"
import Media from "react-media"
import { Layout, Menu, Icon } from "antd"
import { Link } from "@reach/router"
import styles from "./app-menu.module.css"
//import { Link} from "gatsby"

const { Header} = Layout


const GatsbyLink  = props => (
  <Link
    {...props}
    getProps={(props ) => {
      //console.log(props)
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          border: props.isCurrent ? "3px solid white" : "1px solid black"
        }
      };
    }}
  />
)



const DesktopMenu = ({menuLinks}) => {


  return (
    <Header>
      <div className={styles.logo}/>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[`0`]}
        // selectedKeys={[`${testing}`]}
        style={{ lineHeight: "64px" }}
      >
        {menuLinks.map(({key, link, name}) =>{
          return <Menu.Item key={key}><GatsbyLink  to={link}>{name.toUpperCase()}</GatsbyLink></Menu.Item> //activeClassName={styles.activeLink}
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
          defaultSelectedKeys={[`0`]}
          // selectedKeys={[`${currentLocation(menuLinks, location)}`]}
          theme="dark"
          onClick={function({ item, key, keyPath, domEvent }) {
            //console.log(item, key, keyPath, domEvent)

          }}
        >
          {menuLinks.map(({key, link, name}) =>{
            return (
              <Menu.Item key={key}>
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

class AppMenu extends React.Component{

  componentDidMount(){

    console.log('componentDidMount--')

  }

  render(){

    return (
      <>
        <Media query="(max-width: 599px)">
          {matches =>
            matches ? (
              <MobileMenu menuLinks={this.props.menuLinks}/>
            ) : (
              <DesktopMenu menuLinks={this.props.menuLinks}/>
            )
          }
        </Media>
      </>
    )
  }

}


export default AppMenu