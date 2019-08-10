import React from "react"
import { Location } from "@reach/router"
import { Link } from "gatsby"
import { Breadcrumb, Icon } from "antd"
import styles from "./app-breadcrumbs.module.css"

const Breadcrumbs = (props) => {
  //console.log('Breadcrumbs--',props)
  const pathSnippets = props.location.pathname.split("/").filter(i => i)
  const pathsLength = pathSnippets.length
  const extraBreadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = pathsLength === index + 1 ? `/${pathSnippets.slice(0, index + 1).join("/")}` : `/${pathSnippets.slice(0, index + 1).join("/")}/`
    //const title =  pathsLength === index + 1 ? props.title : snippet
    const newAlias = props.alias ? props.alias[0].toUpperCase() + props.alias.slice(1) : ""
    const title = pathsLength === index + 1 ? props.title : newAlias || snippet
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url} aria-label={`Переход на страницу ${title}`}>{title}</Link>
      </Breadcrumb.Item>
    )
  })

  //console.log(pathSnippets)
  return (
    <Breadcrumb className={styles.breadcrumbs} separator={"»"}>
      <Breadcrumb.Item>
        <Link to={"/"} aria-label={`Переход на домашнюю страницу`}><Icon type="home" style={{ fontSize: "18px" }}/></Link>
      </Breadcrumb.Item>
      {extraBreadcrumbItems}
    </Breadcrumb>
  )
}

export default props => (
  <Location>
    {locationProps => <Breadcrumbs {...locationProps} {...props} />}
  </Location>
)
