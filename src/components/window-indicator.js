import React from "react"
import {connect} from 'react-redux'
import * as actions from "../redux/actions/window"

class WindowIndicator extends React.Component{
   componentDidMount(){
     this.props.changeWindowState()
   }
   render(){
     return this.props.children
   }
}

export default connect(null, actions)(WindowIndicator)