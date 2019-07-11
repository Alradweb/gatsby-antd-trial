import React from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header"
import AppLayout from "../containers/app-layout"

export default (props) => {
  const { data } = props
  console.log(props)
  return (
    <AppLayout>
      <div style={{ color: `purple` }}>
        <Header headerText={data.site.siteMetadata.title}/>
        <Link to="/contact/">Contact</Link>
        <p>language : {data.site.siteMetadata.language}</p>
        <img src="https://source.unsplash.com/random/400x200" alt="Fq8USwd9HH3A62D"/>
      </div>
    </AppLayout>
  )
}
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        language
      }
    }
  }
`
