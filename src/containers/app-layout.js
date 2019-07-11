import React from "react"
import styles from "./app-layout.module.css"
import { Layout, Menu, Breadcrumb } from "antd"
import { Link } from "@reach/router"

const { Header, Content, Footer } = Layout

const AppLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header>
        <div className={styles.logo}/>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/users">Users</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/articles">Articles</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
          <Breadcrumb.Item>App2</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a> and {" "}
        <a href="http://strapi.io">Strapi</a>
      </Footer>
    </Layout>
  )
}
export default AppLayout
