import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../containers/app-layout"
import Img from "gatsby-image"
import { Col, Row, Card } from "antd"
import ImportantInfo from "../components/important-info/important-info"
import ReactMarkdown from "react-markdown"
import styles from "./app-articles-list.module.css"
import Paginator from "../components/paginator/paginator"
import Helmet from "react-helmet"

const NewsList = props => {
    const { currentPage, numPages } = props.pageContext
    const articles = props.data.allStrapiNewsarticle.edges

    return (
        <Layout>
            <Helmet title={`Список новостей. Страница - ${currentPage}`} />
            <Row>
                <Col
                    xs={{ span: 24 }}
                    md={{ span: 16 }}
                    className={styles.articlesContainer}
                >
                    <h1>ВСЕ НОВОСТИ:</h1>
                    <ul className={styles.articlesList}>
                        {articles.map((a, idx) => {
                            const lastItem = articles.length === idx + 1 || null
                            return (
                                <li
                                    className={styles.articlesItem}
                                    key={a.node.id}
                                    style={lastItem && { border: "none" }}
                                >
                                    <Link
                                        to={`/news/${a.node.customPath}`}
                                        aria-label={`Переход на страницу новости ${a.node.title}`}
                                    >
                                        <Row>
                                            <Col
                                                xs={{ span: 24 }}
                                                md={{ span: 12 }}
                                                className={
                                                    styles.imageContainer
                                                }
                                            >
                                                <Card
                                                    bordered={false}
                                                    cover={
                                                        <Img
                                                            fluid={
                                                                a.node.image
                                                                    .childImageSharp
                                                                    .fluid
                                                            }
                                                        />
                                                    }
                                                    bodyStyle={{
                                                        padding: "8px",
                                                    }}
                                                />
                                            </Col>
                                            <Col
                                                xs={{ span: 24 }}
                                                md={{ span: 12 }}
                                                className={styles.articlesText}
                                            >
                                                <h3
                                                    className={
                                                        styles.articlesTitle
                                                    }
                                                >
                                                    {a.node.title}
                                                </h3>
                                                <ReactMarkdown
                                                    source={a.node.content
                                                        .substring(0, 200)
                                                        .concat("...")}
                                                    allowedTypes={[
                                                        "text",
                                                        "paragraph",
                                                    ]}
                                                    allowNode={(node, index) =>
                                                        !index
                                                    }
                                                    escapeHtml={false}
                                                />
                                            </Col>
                                        </Row>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <ImportantInfo vertical />
                    {/*<NewsPrev widget/>*/}
                </Col>
            </Row>
            <Paginator
                currentPage={currentPage}
                numPages={numPages}
                pageName="news"
            />
        </Layout>
    )
}

export const query = graphql`
    query NewsList($skip: Int!, $limit: Int!) {
        allStrapiNewsarticle(
            sort: { order: DESC, fields: date }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    title
                    content
                    customPath
                    date(formatString: "DD.MM.YYYY")
                    readerDate: date(formatString: "YYYY-MM-DD")
                    image {
                        childImageSharp {
                            fluid(maxWidth: 960, maxHeight: 600, quality: 90) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    }
`
export default NewsList
