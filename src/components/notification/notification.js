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
      // style: {
      //   width: 600,
      //   marginLeft: 335 - 600,
      // },
    })
    repeatedMessage = false
  },600)

}
export  default notificationOpen

