import React from "react"
import { Link, navigate } from "gatsby"
import styles from "./app-most-interesting.module.css"
import sky from "../../../static/sky.png"
import { Row, Col, Card } from "antd"
import Img from "gatsby-image"
import Social from "../social/social"
import withArticles from "../withArticles"

const InterestingArticle = props => {
    return (
        <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            lg={{ span: 6 }}
            className={styles.container}
            onClick={ev => {
                if (ev.target.tagName === "DIV")
                    navigate(`/articles/${props.path}`)
            }}
        >
            <Card
                bordered={false}
                cover={<Img fluid={props.fluid} />}
                bodyStyle={{
                    display: "flex",
                    padding: "8px",
                    textAlign: "center",
                    overflow: "hidden",
                }}
            >
                <Social color="dark" customStyle={{ margin: "0 auto 0 0" }} />
            </Card>
            <Link to={`/articles/${props.path}`}>
                <h3 className={styles.title}>{props.title}</h3>
            </Link>
        </Col>
    )
}

const MostInteresting = props => {
    const articles = props.articles.slice(1, 5)
    return (
        <section
            className={styles.mostInteresting}
            style={{ backgroundImage: `url(${sky})` }}
        >
            <h2 className={styles.sectionTitle}>САМОЕ ИНТЕРЕСНОЕ</h2>
            <Row className={styles.row}>
                {articles.map(a => {
                    return (
                        <InterestingArticle
                            key={a.node.id}
                            title={a.node.title}
                            id={a.node.id}
                            path={a.node.customPath}
                            fluid={a.node.fluidImage.childImageSharp.fluid}
                        />
                    )
                })}
            </Row>
        </section>
    )
}
export default withArticles(MostInteresting)
