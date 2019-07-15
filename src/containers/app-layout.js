import React from "react"
import styles from "./app-layout.module.css"
import AppMenu from "../components/app-menu/menu"
import { Layout} from "antd"
//import PageProgress from "react-page-progress"
import { graphql, StaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
if (typeof window !== `undefined`) {
  var PageProgress = require("react-page-progress").default
}
const { Content, Footer } = Layout
console.log(PageProgress)
const TestLayout = ({ children }) => (
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
      <React.Fragment>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={data.site.siteMetadata.helmetMetaData}
        >
        </Helmet>
        <div className={styles.appLayout}>
           { PageProgress ? <PageProgress color='blue' height={3}/> : null}
          <AppMenu menuLinks={data.site.siteMetadata.menuLinks}/>
          <Content>
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a> and {" "}
            <a href="http://strapi.io">Strapi</a>
          </Footer>
        </div>
      </React.Fragment>
    )}
  />
)
export default TestLayout
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
