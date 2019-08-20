import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import Auth from "../auth/auth"
import CommentList from "./comments-list"
import Editor from "./editor"
import { Comment, Avatar } from "antd"
import notificationOpen from "../notification/notification"
const path = process.env.COMMENTS_API_URL
const cats = process.env.TEST_BEST_CATS
console.log('path--', path, 'cats--', cats)
//"https://rocky-reaches-90322.herokuapp.com"
const socket = io(path, {
  autoConnect: false,
})

//import openSocket from 'socket.io-client'
//import { subscribeToTimer, socketToggle } from '../../utils';
class Comments2 extends React.Component {

  state = {
    commentsList: [],
    userIsLogin: false,
    comment: "",
    submitting: false,
    modalVisible: false,
    showTextField: false,
    userName: "",
    userAvatar: "",
    userId: null,
    formTitle: "",
  }
  getData = commentsList => {
    //console.log("commentsList by server=--", commentsList)
    this.setState({ commentsList })
  }

  getAuthData = (data) => {
    data.login ?
      this.checkLoginOnServer(null, data) :
      this.checkRegisterOnServer(data)
    //console.log(data)
  }

  componentDidMount() {
    setTimeout(() => {
      socket.open()
      socket.emit("get all comments by ownerId", this.props.ownerId)
      socket.on("all messages", this.getData)
    }, 1000)
  }

  componentWillUnmount() {
    socket.off("all messages", this.getData)
    socket.off("login ok", this.processResultOfLoginRequest)
    socket.off("registration ok", this.processResultOfRegisterRequest)
    socket.emit("end")
  }

  editorChange = (ev) => {
    const comment = ev.target.value
    console.log('textArea', comment)
    this.setState({
      comment
    })
  }

  submitData = (ev) => {
    //console.log('submit', this.state.comment)
    const content = this.state.comment
    if (!content.trim() || !ev.isTrusted) return
    const newCommentForServer = {
      comment: { content },
      author: { id: this.state.userId },
      article: { ownerId: this.props.ownerId, title: this.props.title },
    }
    socket.emit("chat message", newCommentForServer)
    const newCommentForClient = {
      author: this.state.userName,
      avatar: this.state.userAvatar,
      content: this.state.comment,
      datetime: Date.now()
    }
    const addComment = [...this.state.commentsList, newCommentForClient]
    this.setState({
      commentsList: addComment,
      comment: "",
    })

  }

  handleModalCancel = () => {
    this.setState({
      modalVisible: false
    })
  }
  processResultOfRegisterRequest = data => {
    console.log("register confirmed--", data)
    if (data.token) {
      if(data.remember) localStorage.setItem("token_auth", data.token)
      this.setState({
        userIsLogin: true,
        modalVisible: false,
        showTextField: true,
        userName: data.name,
        userAvatar: data.avatar,
        userId: data.id,
      })
      notificationOpen('success', 'Уведомление', 'Регистрация прошла успешно. Напишите свой комментарий')
    } else {
      notificationOpen("error", "Ошибка!", 'Регистрация не удалась. Попробуйте ещё раз')
      this.setState({
        modalVisible: true,
        showTextField: false,
      })
    }
  }
  writeComment = () => {
    const token = localStorage.getItem("token_auth")
    if (token) {
      this.checkLoginOnServer(token)
    } else {
      this.openForm("register")
    }
  }
  checkRegisterOnServer = (data) => {
    socket.emit("registration", data)
    socket.on("registration ok", this.processResultOfRegisterRequest)
  }
  checkLoginOnServer = (token, data) => {
    const dummyToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6Ik4XVCJ9.eyJlbWFpbCI6IеVtd2FpbEBnb29kLmdkZSIsInBhc3N3b3JkIjoiMTExMTExIiwiaWQiOiI1ZDU4MjBjODA1ZTRmNzJmNzA5NGE5NWQiLCJpYXQiOjE1NjYwNTY3MzgsImV4cCI6MTcyMzczNjczOH0.eZfh74qNRe0Hm9iEKhZTEGfUwXmHPfjW4Mb-AmuC900-mcVQ3qL7B_z8sLnUc7PEHTpUUd4tagzdLwOacIoiCw`
    const generateData = token ? { token } : { data }
    socket.emit("login", generateData)
    socket.on("login ok", this.processResultOfLoginRequest)
  }
  processResultOfLoginRequest = result => {
    if (result.token) {
      if(result.remember) localStorage.setItem("token_auth", result.token)
      this.setState({
        modalVisible: false,
        userIsLogin: true,
        showTextField: true,
        userName: result.name,
        userAvatar: result.avatar,
        userId: result.id,
      })
    } else {
      notificationOpen("error", "Уведомление", "Требуется вход в систему")
      this.openForm("login")
    }
  }
  openForm = (title) => {
    this.setState({
      formTitle: title,
      modalVisible: true,
    })
  }

  render() {
    const { userIsLogin, commentsList, comment, submitting, modalVisible, showTextField, formTitle, userAvatar } = this.state
    //return <div>Comment list</div>

    const { submitData, editorChange, handleModalCancel, writeComment } = this
    return (
      <>
        <div>
          <h4>Про котов - {cats}.</h4>
          {commentsList.length > 0 && <CommentList comments={commentsList}/>}
          {
            showTextField ? <Comment
                avatar={
                  <Avatar
                    src={userAvatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                    alt="Avatar"
                  />
                }
                content={

                  <Editor
                    onChange={editorChange}
                    onSubmit={submitData}
                    submitting={submitting}
                    userIsLogin={userIsLogin}
                    value={comment}
                  />

                }
              /> :
              <button onClick={writeComment} className='button'>Написать комментарий</button>
          }

        </div>
        <Auth authData={this.getAuthData} visible={modalVisible} formTitle={formTitle}
              handleModalCancel={handleModalCancel}/>
      </>
    )
  }
}

export default Comments2

