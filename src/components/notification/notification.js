import { notification } from 'antd'

let repeatedMessage = false

const notificationOpen = (type, message, description) =>{
  if(repeatedMessage) return
  repeatedMessage = true

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

  // return(
  //   <div>
  //     <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
  //     <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
  //     <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
  //     <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
  //   </div>
  // )
}
export  default notificationOpen

