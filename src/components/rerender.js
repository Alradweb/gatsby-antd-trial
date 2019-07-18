import React from "react"

const rerender = (Component) => {
  return class extends React.Component {
    state = {
      isWindow: false
    }

    componentDidMount() {
        this.setState((state)=>{
          return{
            isWindow: !state.isWindow
          }
        })
    }

    render() {
      return <Component {...this.props} isWindow={this.state.isWindow}/>
    }
  }
}
export default rerender