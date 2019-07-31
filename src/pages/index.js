import React from "react"
import { graphql } from "gatsby"
import Layout from "../containers/app-layout"
//import ReactMarkdown from "react-markdown"
import ArticlesPrev from "../components/articles-prev/articles-prev"
import NewsPrev from "../components/news-prev/news-prev"
import MostInteresting from "../components/most-interesting/most-interesting"
import Popular from "../components/popular/popular"
import RandomArticles from "../components/random-articles/random-articles"
import ShowMore from "../components/showMore/show-more"

/* eslint-disable */

export default (props) => {
    //const { data } = props
    //console.log(props)
    return (
        <Layout>
            <ArticlesPrev columns={5}/>
            <NewsPrev/>
            <MostInteresting/>
            <Popular/>
            <RandomArticles/>
            <ShowMore/>
        </Layout>
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

//   <div style={{width: '100%', height: '100vh'}}>
// <Card
// cover={<video id="bg-vid" className="app-media" autoPlay muted loop
//               style={{ opacity: '0.62' }}>
//   <source src="https://dsnu2dcxtn37x.cloudfront.net/assets/videos/gmlaunch2.mp4" type="video/mp4"/>
// </video>}
// />
//
// </div>