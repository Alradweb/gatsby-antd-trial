import React from "react"
import {connect} from 'react-redux'
import * as actions from "../redux/actions/window"

// const rerender = (Component) => {
//   return class extends React.Component {
//     state = {
//       isWindow: false
//     }
//
//     componentDidMount() {
//         //console.log(this.props)
//         this.setState((state)=>{
//           return{
//             isWindow: !state.isWindow
//           }
//         })
//     }
//
//     render() {
//       return <Component {...this.props} isWindow={this.state.isWindow}/>
//     }
//   }
// }
class WindowIndicator extends React.Component{
   componentDidMount(){
     this.props.changeWindowState()
     console.log(this.props)
   }
   render(){
     return this.props.children
   }
}

export default connect(null, actions)(WindowIndicator)