import React from "react"
import { Link } from "gatsby"
import AppLayout from "../containers/app-layout"
import User from "../components/user"
import { Row } from "antd"

export default () => (
  <AppLayout>
    <div style={{ padding: "20px" }}>
      <Link to="/">Home</Link>
      <Row gutter={{ xs: 8, sm: 16 }}>
        {
          [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8].map((user, idx) => {
            return (
              <User key={idx}/>
            )
          })
        }
      </Row>
    </div>
  </AppLayout>
)
