import React from 'react'
import { Comment, List} from 'antd'
import moment from 'moment'
import 'moment/locale/ru'
//moment.locale('ru')

const CommentList = ({ comments }) => {

  //console.log(moment)
  // const event = moment(comments[0].datetime)
  //console.log('ло ' + event)
  //console.log('Событие произошло ' + event.fromNow())
 return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'комментариев' : 'комментарий'}`}
      itemLayout="horizontal"
      renderItem={props => {
        const changeProps = {...props, datetime: moment(props.datetime).fromNow()}
        //console.log(changeProps)
       return <Comment {...changeProps} />
       //return <Comment {...props} />
      }}
    />
  )
}
export default CommentList

//{content : 'create an event listener', author: 'Вася Пупкин', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', datetime: '12.08.2019'},

