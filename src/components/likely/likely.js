import React from "react"
import store from "../../redux/store"
import { connect } from "react-redux"
import { moduleLoaded } from "../../redux/actions/module"
import "./app-likely.css"
import DummyLikely from "./dummy-likely"

let likelyModule = null
const setModule = (module) => {
  likelyModule = module
  store.dispatch(moduleLoaded(true))
}
store.subscribe(async () => {
  if (store.getState()._window.isWindow && !likelyModule) {
    //import ('react-ilyabirman-likely').then(likely => like = likely.default)
    const module = await import("react-ilyabirman-likely")
    setModule(module)
  }
})

const AppLikely = (props) => {
  if (props.module.moduleLoaded && likelyModule) {
    const Likely = likelyModule.default
    const { Facebook, Twitter, Vkontakte, Odnoklassniki } = likelyModule
    return (
      <Likely>
        <Facebook/>
        <Twitter via="your_twitter_account"/>
        <Vkontakte/>
        <Odnoklassniki/>
      </Likely>
    )
  } else {
    return <DummyLikely/>
  }
}


const mapStateToProps = ({ module }) => {
  return {
    module,
  }
}
export default connect(mapStateToProps)(AppLikely)

// {/*<Likely>*/}
// {/*  <Facebook>Facebook</Facebook>*/}
// {/*  <Twitter via="your_twitter_account">Twitter</Twitter>*/}
// {/*  <Vkontakte>Vkontakte</Vkontakte>*/}
// {/*  <Odnoklassniki>Odnoklassniki</Odnoklassniki>*/}
// {/*</Likely>*/}