import React from "react"
import {Provider} from 'react-redux'
import store from '../redux/store'
import styles from "./app-layout.module.css"
import AppMenu from "../components/app-menu/menu"
import { Layout} from "antd"
import { graphql, StaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import { Location } from '@reach/router';
import WindowIndicator from "../components/window-indicator"
import ScrollProgress from "../components/scroll-progress/scroll-progress"
import ImportantInfo from "../components/important-info/important-info"

const { Content, Footer } = Layout

const AppLayout = (props) => {
 // console.log('Layout(props)->',props)
  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            helmetMetaData {
              content
              name
            }
            menuLinks {
             name
              link
              key
            }
          }
        }
      }
    `}
      render={data => (
        <Provider store={store}>
          <WindowIndicator>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={data.site.siteMetadata.helmetMetaData}
          >
          </Helmet>
          <ScrollProgress/>
          <AppMenu
            menuLinks={data.site.siteMetadata.menuLinks}
            currentPath={props.location.pathname}

          />
          <div className={styles.appLayout}>
            <ImportantInfo/>
            <Content>
              {props.children}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a> and {" "}
              <p>test info</p>
              <a href="http://strapi.io">Strapi</a>
            </Footer>
          </div>
          </WindowIndicator>
        </Provider>
      )}
    />
  )
}


export default props => (
  <Location>
    {locationProps => <AppLayout {...locationProps} {...props} />}
  </Location>
)
// const AppLayout = ({ children }) => {
//   return (
//     <div className={styles.appLayout}>
//       <DocumentHead/>
//       <PageProgress color='tomato' height={3}/>
//       <AppMenu/>
//       <Content style={{ padding: "0 20px" }}>
//         <Breadcrumb style={{ margin: "16px 0" }}>
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//           <Breadcrumb.Item>List</Breadcrumb.Item>
//           <Breadcrumb.Item>App</Breadcrumb.Item>
//         </Breadcrumb>
//         <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
//           {children}
//         </div>
//       </Content>
//
//       <Footer style={{ textAlign: "center" }}>
//         © {new Date().getFullYear()}, Built with
//         {` `}
//         <a href="https://www.gatsbyjs.org">Gatsby</a> and {" "}
//         <a href="http://strapi.io">Strapi</a>
//       </Footer>
//     </div>
//   )
// }
// export default AppLayout
