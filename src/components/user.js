import React from "react"
import { Card, Icon, Avatar, Col } from "antd"
import { useStaticQuery, graphql } from "gatsby"

const { Meta } = Card

const User = (props) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  )
  return (
    <Col span={8}>
      <Card
        style={{ padding: "20px" }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[<Icon type="setting"/>, <Icon type="edit"/>, <Icon type="ellipsis"/>]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
          title={data.site.siteMetadata.title}
          description="This is the description"

        />
      </Card>
    </Col>
  )
}
export default User