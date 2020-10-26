import React from "react"
import {Comment, List} from "antd"
import moment from "moment"
import "moment/locale/ru"


const CommentList = ({comments}) => {

    const sum = comments.length
    const cms = (sum === 1 || (sum > 19 && sum % 10 === 1)) ?
        'комментарий' :
        ((sum > 1 && sum < 5) || (sum > 19 && sum % 10 > 1 && sum % 10 < 5)) ?
            'комментария' :
            'комментариев'

    return (
        <List
            dataSource={comments}
            header={`${sum} ${cms}`}
            itemLayout="vertical"
            renderItem={props => {
                const changeProps = {...props, datetime: moment(props.datetime).fromNow()}
                return <List.Item style={{border: 'none'}}>
                    <Comment {...changeProps} />
                </List.Item>
            }}
        />
    )
}
export default CommentList


