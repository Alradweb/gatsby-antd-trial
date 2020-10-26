import { notification } from 'antd'

let repeatedMessage = false

const notificationOpen = (type, message, description) =>{
  if(repeatedMessage) return
  repeatedMessage = true

  notification.config({
    placement: 'bottomRight',
    bottom: 50
  })

  setTimeout(()=>{
    notification[type]({
      message,
      description
    })
    repeatedMessage = false
  },600)

}
export  default notificationOpen

