import React from "react"
import { Provider } from "react-redux"
import store from "../redux/store"
import styles from "./app-layout.module.css"
import AppMenu from "../components/app-menu/menu"
import { Layout } from "antd"
import { graphql, StaticQuery } from "gatsby"
//import { Helmet } from "react-helmet"
import { Location } from "@reach/router"
import WindowIndicator from "../components/window-indicator"
import ScrollProgress from "../components/scroll-progress/scroll-progress"
import ImportantInfo from "../components/important-info/important-info"
import ScrollToTop from "../components/scroll-to-top/scroll-to-top"
import Footer from "../components/footer/footer"
import SEO from "../components/seo/seo"
const { Content } = Layout

const AppLayout = props => {
    //console.log('Layout(props)->',props)

    return (
        <StaticQuery
            query={graphql`
                query SiteTitleQuery {
                    site {
                        siteMetadata {
                            menuLinks {
                                name
                                alias
                                link
                                icon
                            }
                        }
                    }
                }
            `}
            render={data => {

                return (
                    <Provider store={store}>
                        <SEO />
                        <WindowIndicator>
                            {/*<Helmet*/}
                            {/*  title={data.site.siteMetadata.title}*/}
                            {/*  meta={data.site.siteMetadata.helmetMetaData}*/}
                            {/*>*/}
                            {/*</Helmet>*/}
                            <ScrollProgress />
                            <AppMenu
                                menuLinks={data.site.siteMetadata.menuLinks}
                                currentPath={props.location.pathname}
                            />
                            <div className={styles.appLayout}>
                                <ImportantInfo horizontal />
                                <Content>{props.children}</Content>
                            </div>
                            <Footer>
                                <AppMenu
                                    menuLinks={data.site.siteMetadata.menuLinks}
                                    currentPath={props.location.pathname}
                                    lower
                                />
                            </Footer>
                            <ScrollToTop />
                        </WindowIndicator>
                    </Provider>
                )
            }}
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
