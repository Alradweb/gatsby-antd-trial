import React, { Component } from "react"
import store from "../../redux/store"
import { connect } from "react-redux"
import "./app-likely.css"
import { moduleLoaded } from "../../redux/actions/module"

let likelyModule = null
const neededFunc = (module) => {
  likelyModule = module
  store.dispatch(moduleLoaded(true))
}
store.subscribe(async () => {
  if (store.getState()._window.isWindow && !likelyModule) {
    //import ('react-ilyabirman-likely').then(likely => like = likely.default)
    const module = await import("react-ilyabirman-likely")
    neededFunc(module)
  }
})

const AppLikely = (props) => {
  console.log(props)
  if (props.module.moduleLoaded && likelyModule) {
    const Likely = likelyModule.default
    const { Facebook, Twitter, Vkontakte, Odnoklassniki } = likelyModule
    return (
      <Likely size={"small"} skin={"default"}>
        <Facebook>Share on Facebook</Facebook>
        <Twitter via="your_twitter_account">Share on Twitter</Twitter>
        <Vkontakte>Share on Vkontakte</Vkontakte>
        <Odnoklassniki>Share on Odnoklassniki</Odnoklassniki>
      </Likely>
    )
  }else {
    return (
      <div>social networks</div>
    )
  }

}


const mapStateToProps = ({ module }) => {
  return {
    module,
  }
}
export default connect(mapStateToProps)(AppLikely)