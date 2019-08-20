import React from "react"
import { graphql } from "gatsby"
//import Img from "gatsby-image"
import Layout from "../containers/app-layout"
import ReactMarkdown from "react-markdown"
import AppLikely from "../components/likely/likely"
import { Row, Col } from "antd"
import styles from "./app-article.module.css"
import Social from "../components/social/social"
import ImportantInfo from "../components/important-info/important-info"
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs"
import NewsPrev from "../components/news-prev/news-prev"
import ArticlesPrev from "../components/articles-prev/articles-prev"
import SEO from "../components/seo/seo"
import Comments from "../components/comments/comments"

// "policy": [{
//       "img-src": "'self' http:"
//     },
//       "block-all-mixed-content"
//     ] security.json

const ArticleTemplate = props => {
    const { data } = props
   // console.log(data.strapiArticle.image.childImageSharp.fluid.src)
    return (
        <Layout>
            <SEO
                title={data.strapiArticle.title}
                description={data.strapiArticle.content || " "}
                image={data.strapiArticle.image.childImageSharp.fluid.src}
                pathname={`/articles/${data.strapiArticle.customPath}`}
                article
            />
            <div
                className={styles.container}
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.7)), url(${data.strapiArticle.image.childImageSharp.fluid.src})`,
                }}
            >
                <div className={styles.content}>
                    <h1 className={styles.title}>{data.strapiArticle.title}</h1>
                    <Social color="light" />
                </div>
            </div>
            <Row style={{ marginBottom: "32px" }}>
                <Col
                    xs={{ span: 24 }}
                    md={{ span: 16 }}
                    className={styles.article}
                >
                    <div className={styles.articleHeader}>
                        <Breadcrumbs
                            title={data.strapiArticle.title}
                            alias={props.pageContext.alias}
                        />
                    </div>
                    <ImportantInfo horizontal />
                    <div className={styles.text}>
                        <ReactMarkdown
                            source={data.strapiArticle.content}
                            transformImageUri={uri =>
                                uri.startsWith("http")
                                    ? uri
                                    : `${process.env.IMAGE_BASE_URL}${uri}`
                            }
                            escapeHtml={false}
                        />
                        <div className={styles.social}>
                            <AppLikely color="dark" fullSize lowerWidget />
                        </div>
                        <ImportantInfo horizontal />
                        <ArticlesPrev
                            lowerWidget
                            columns={5}
                            exceptedIdArticle={data.strapiArticle.id}
                        />
                    </div>
                    <Comments title={data.strapiArticle.title} ownerId={data.strapiArticle.id}/>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <ImportantInfo vertical />
                    <NewsPrev widget />
                </Col>
            </Row>
        </Layout>
    )
}
export default ArticleTemplate

export const query = graphql`
    query ArticleTemplate($id: String!) {
        strapiArticle(id: { eq: $id }) {
            title
            content
            id
            customPath
            image {
                childImageSharp {
                    fluid {
                        src
                    }
                }
            }
            author {
                id
                username
            }
        }
    }
`
