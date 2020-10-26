import React from "react"
import { Provider } from "react-redux"
import store from "../redux/store"
import styles from "./app-layout.module.css"
import AppMenu from "../components/app-menu/menu"
import { Layout } from "antd"
import { graphql, StaticQuery } from "gatsby"
import { Location } from "@reach/router"
import WindowIndicator from "../components/window-indicator"
import ScrollProgress from "../components/scroll-progress/scroll-progress"
import ImportantInfo from "../components/important-info/important-info"
import ScrollToTop from "../components/scroll-to-top/scroll-to-top"
import Footer from "../components/footer/footer"
import SEO from "../components/seo/seo"
const { Content } = Layout

const AppLayout = props => {


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
