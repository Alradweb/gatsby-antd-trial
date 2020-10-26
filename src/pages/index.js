import React from "react"
import Layout from "../containers/app-layout"
import ArticlesPrev from "../components/articles-prev/articles-prev"
import NewsPrev from "../components/news-prev/news-prev"
import MostInteresting from "../components/most-interesting/most-interesting"
import Popular from "../components/popular/popular"
import RandomArticles from "../components/random-articles/random-articles"
import ShowMore from "../components/showMore/show-more"
import Helmet from "react-helmet"
//import SEO from "../components/seo/seo"

/* eslint-disable */

export default props => {
    return (
        <Layout>
            <Helmet title={"Домашняя страница"} />
            <ArticlesPrev columns={5} />
            <NewsPrev />
            <MostInteresting />
            <Popular />
            <RandomArticles />
            <ShowMore />
        </Layout>
    )
}
