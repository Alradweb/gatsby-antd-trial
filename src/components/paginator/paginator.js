import React from "react"
import { Link } from "gatsby"
import styles from "./app-paginator.module.css"
import { Icon, Pagination } from "antd"

const Paginator = props => {
    //console.log(props)

    const { currentPage, numPages, pageName } = props
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    function renderItems(i, type) {
        if (type === "page") {
            return i === 1 ? (
                <Link
                    className={i === currentPage ? styles.activeHref : ""}
                    to={`/${pageName}/`}
                >
                    {i}
                </Link>
            ) : (
                <Link
                    className={i === currentPage ? styles.activeHref : ""}
                    to={`/${pageName}/${i}`}
                >
                    {i}
                </Link>
            )
        }
        if (type === "next") {
            return isLast ? (
                <Icon
                    type="double-right"
                    style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: "15px" }}
                />
            ) : (
                <Link
                    to={`/${pageName}/${nextPage}`}
                    rel="next"
                    title={"Следующая страница"}
                >
                    <Icon
                        type="double-right"
                        style={{ color: "tomato", fontSize: "15px" }}
                    />
                </Link>
            )
        }
        if (type === "prev") {
            return isFirst ? (
                <Icon
                    type="double-left"
                    style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: "15px" }}
                />
            ) : (
                <Link
                    to={`/${pageName}/${prevPage}`}
                    rel="prev"
                    title={"Предыдущая страница"}
                >
                    <Icon
                        type="double-left"
                        style={{ color: "tomato", fontSize: "15px" }}
                    />
                </Link>
            )
        }
    }
    return (
        <section className={styles.paginateWrapper}>
            {!isLast && (
                <Link
                    to={`/${pageName}/${nextPage}`}
                    className={styles.button}
                    rel="next"
                >
                    Следующая страница{" "}
                    <Icon type="double-right" style={{ color: "#ffffff" }} />
                </Link>
            )}
            <div>
                <Pagination
                    defaultCurrent={currentPage}
                    total={numPages * 10}
                    itemRender={renderItems}
                    className={styles.pagination}
                />
            </div>
        </section>
    )
}
export default Paginator
