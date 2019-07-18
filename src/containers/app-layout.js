import React from "react"
import styles from "./app-layout.module.css"
import AppMenu from "../components/app-menu/menu"
import { Layout} from "antd"
import { graphql, StaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import { Location } from '@reach/router';
import { isWindow } from "../utils"

const PageProgress = isWindow ? require("react-page-progress").default : null

const { Content, Footer } = Layout
//console.log(PageProgress)
const TestLayout = (props) => (
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
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={data.site.siteMetadata.helmetMetaData}
        >
        </Helmet>
        { PageProgress && <PageProgress color='blue' height={3}/> }
        <AppMenu  menuLinks={data.site.siteMetadata.menuLinks} currentPath={props.location.pathname}/>
        <div className={styles.appLayout}>

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
      </>
    )}
  />
)
//export default TestLayout
export default props => (
  <Location>
    {locationProps => <TestLayout {...locationProps} {...props} />}
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
