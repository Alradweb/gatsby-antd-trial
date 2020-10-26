import React from "react"
import { Link, navigate } from "gatsby"
import { Col, Row } from "antd"
import styles from "./app-articles-prev.module.css"
import Social from "../social/social"
import withArticles from "../withArticles"

const PrevArticle = props => {

    return (
        <Col
            xs={{ span: 24 }}
            sm={{ span: props.span }}
            className={styles.articlePrev}
        >
            <div
                className={
                    props.minSize ? styles.minContainer : styles.container
                }
                style={{ backgroundImage: `url(${props.imgSrc})` }}
                onClick={ev => {
                    if (ev.target.tagName === "DIV")
                        navigate(`/articles/${props.path}`)
                }}
            >
                <div className={styles.content}>
                    <div className={styles.text}>
                        <Link to={`/articles/${props.path}`}>
                            <h3>{props.title.toUpperCase()}</h3>
                        </Link>
                    </div>
                    <Social color="light" />
                </div>
            </div>
        </Col>
    )
}
const ArticlesSideWidget = ({ articles }) => {
    return (
        <Row>
            <Link to={"/articles/"}>
                <h3 className={styles.widgetTitle}>Статьи</h3>
            </Link>
            {articles.map(a => {
                return (
                    <Col
                        xs={{ span: 24 }}
                        key={a.node.id}
                        className={styles.widgetColumn}
                    >
                        <Row
                            className={styles.widgetWrap}
                            onClick={ev => {
                                if (ev.target.tagName === "DIV")
                                    navigate(`/articles/${a.node.customPath}`)
                            }}
                        >
                            <Col
                                xs={{ span: 4 }}
                                className={styles.widgetLeftPart}
                            >
                            </Col>
                            <Col
                                xs={{ span: 20 }}
                                className={styles.widgetText}
                            >
                                <Link
                                    to={`/articles/${a.node.customPath}`}
                                    style={{ color: "inherit" }}
                                >
                                    <p>{a.node.title}</p>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                )
            })}
        </Row>
    )
}
const ArticleLowerWidget = props => {
    return (
        <div className={styles.lowerWidget}>
            <h3 className={styles.lowerWidgetTitle}>{"Читать еще:"}</h3>
            <ul className={styles.lowerWidgetList}>
                {props.articles.map(a => {
                    return (
                        <li className={styles.lowerWidgetItem} key={a.node.id}>
                            <Link to={`/articles/${a.node.customPath}`}>
                                {a.node.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
const ArticlesPrev = props => {
    if (props.lowerWidget) {
        const getArticles = () => {
            if (!props.exceptedIdArticle)
                return props.articles.slice(-props.columns)
            const idx = props.articles.findIndex(
                el => el.node.id === props.exceptedIdArticle
            )
            return [
                ...props.articles.slice(0, idx),
                ...props.articles.slice(idx + 1),
            ].slice(-props.columns)
        }
        return <ArticleLowerWidget articles={getArticles()} />
    }
    if (props.sideWidget)
        return (
            <ArticlesSideWidget
                articles={props.articles.slice(-props.columns)}
            />
        )
    const articles = props.specialArticles
        ? props.specialArticles
        : props.articles.slice(-props.columns)

    return (
        <div className={styles.articlesPrev}>
            <Row>
                {articles.map((article, idx) => {
                    let span = 24
                    if (props.columns === 5) {
                        span = idx < 2 ? 12 : 8
                    }
                    if (props.columns === 4) {
                        span = 12
                    }
                    return (
                        <PrevArticle
                            title={article.node.title}
                            id={article.node.id}
                            path={article.node.customPath}
                            span={span}
                            key={article.node.id}
                            imgSrc={
                                article.node.image.childImageSharp.fluid.src
                            }
                            minSize={props.minSize || null}
                        />
                    )
                })}
            </Row>
        </div>
    )
}
ArticlesPrev.defaultProps = {
    columns: 2,
}
export default withArticles(ArticlesPrev)
