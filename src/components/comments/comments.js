import React from "react"
import io from "socket.io-client"
import Auth from "../auth/auth"
import CommentList from "./comments-list"
import Editor from "./editor"
import { Comment, Avatar } from "antd"
import notificationOpen from "../notification/notification"

const path = process.env.GATSBY_COMMENTS_API_URL
console.log('path------',path)
const socket = io(path, {
  autoConnect: false,
})

class Comments extends React.Component {

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
    console.log("commentsList by server=--", commentsList)
    this.setState({ commentsList })
  }

  getAuthData = (data) => {
    data.login ?
      this.checkLoginOnServer(null, data) :
      this.checkRegisterOnServer(data)
    //console.log(data)
  }

  // _isMounted = false;
  componentDidMount() {

    //console.log(this.props.ownId)
    setTimeout(() => {
      console.log('this.props.ownId-------', this.props.ownId)
      socket.open()
      socket.emit("get all comments by ownId", this.props.ownId)
      socket.on("all comments", this.getData)
    }, 1000)
  }

  componentWillUnmount() {
    socket.off("all comments", this.getData)
    socket.off("login ok?", this.processResultOfLoginRequest)
    socket.off("registration ok?", this.processResultOfRegisterRequest)
    socket.emit("end")
  }

  editorChange = (ev) => {
    const comment = ev.target.value
    this.setState({
      comment
    })
  }

  submitData = () => {
    //console.log('this.props.ownId--', this.props.ownId)
    const content = this.state.comment
    if (!content.trim()) return
    const newCommentForServer = {
      comment: { content },
      author: { id: this.state.userId },
      article: { ownId: this.props.ownId, title: this.props.title },
      //article: { ownId: null, title: this.props.title },
    }
    socket.emit("add comment", newCommentForServer)
    const newCommentForClient = {
      author: this.state.userName,
      avatar: this.state.userAvatar,
      content: this.state.comment,
      datetime: Date.now(),
    }
    const addComment = [...this.state.commentsList, newCommentForClient]
    this.setState({
      commentsList: addComment,
      comment: "",
    })

  }

  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
    })
  }
  processResultOfRegisterRequest = data => {
    console.log("register confirmed--", data)
    if (data.token) {
      if (data.remember) localStorage.setItem("token_auth", data.token)
      this.setState({
        userIsLogin: true,
        modalVisible: false,
        showTextField: true,
        userName: data.name,
        userAvatar: data.avatar,
        userId: data.id,
      })
      notificationOpen("success", "Уведомление", "Регистрация прошла успешно. Напишите свой комментарий")
    } else {
      notificationOpen("error", "Ошибка!", "Регистрация не удалась. Попробуйте ещё раз")
      this.setState({
        modalVisible: true,
        showTextField: false,
      })
    }
  }
  writeComment = () => {
    this.token = localStorage.getItem("token_auth")
    if (this.token) {
      this.checkLoginOnServer(this.token)
    } else {
      this.openForm("register")
    }
  }
  checkRegisterOnServer = (data) => {
    socket.emit("registration", data)
    socket.on("registration ok?", this.processResultOfRegisterRequest)
  }
  checkLoginOnServer = (token, data) => {
    const dummyToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6Ik4XVCJ9.eyJlbWFpbCI6IеVtd2FpbEBnb29kLmdkZSIsInBhc3N3b3JkIjoiMTExMTExIiwiaWQiOiI1ZDU4MjBjODA1ZTRmNzJmNzA5NGE5NWQiLCJpYXQiOjE1NjYwNTY3MzgsImV4cCI6MTcyMzczNjczOH0.eZfh74qNRe0Hm9iEKhZTEGfUwXmHPfjW4Mb-AmuC900-mcVQ3qL7B_z8sLnUc7PEHTpUUd4tagzdLwOacIoiCw`
    const generateData = token ? { token } : { data }
    socket.emit("login", generateData)
    socket.on("login ok?", this.processResultOfLoginRequest)
  }
  processResultOfLoginRequest = result => {
    if (result.token) {
      if(this.token === null) notificationOpen("success", "Уведомление", "Авторизация прошла успешно. Напишите свой комментарий")
      if (result.remember) localStorage.setItem("token_auth", result.token)
      if (this.state.modalVisible) this.setState({ modalVisible: false })
      this.setState({
        userIsLogin: true,
        showTextField: true,
        userName: result.name,
        userAvatar: result.avatar,
        userId: result.id,
      })
    } else {
      notificationOpen("error", "Уведомление", "Неверное имя пользователя или пароль")
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
    const { submitData, editorChange, handleModalCancel, writeComment, getAuthData } = this
    return (
      <>
        <div>
          <h4 onClick={()=> notificationOpen("error", "Уведомление", "userIsLogin, commentsList, comment, submitting, modalVisible, showTextField, formTitle, userAvatar")}>Комментарии:</h4>
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
        <Auth authData={getAuthData}
              visible={modalVisible}
              formTitle={formTitle}
              handleModalCancel={handleModalCancel}
        />
      </>
    )
  }
}

export default Comments

