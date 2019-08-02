import React from "react"
import store from "../../redux/store"
import { connect } from "react-redux"
import { moduleLoaded } from "../../redux/actions/module"
import styles from "./app-likely.module.css"
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
  let clazz = props.color === "dark" ? styles.likelyDark : styles.likelyLight
  if (props.lowerWidget) clazz = `${clazz} ${styles.lowerWidget}`
  //console.log(clazz)
  if (props.module.moduleLoaded && likelyModule) {
    const Likely = likelyModule.default
    const { Facebook, Twitter, Vkontakte, Odnoklassniki } = likelyModule
    return (
      <div className={clazz}>
        <Likely>
          <Facebook>{props.fullSize && "Facebook"}</Facebook>
          <Twitter via="your_twitter_account">{props.fullSize && "Twitter"}</Twitter>
          <Vkontakte>{props.fullSize && "Вконтакте"}</Vkontakte>
          <Odnoklassniki>{props.fullSize && "Одноклассники"}</Odnoklassniki>
        </Likely>
      </div>
    )
  } else {
    return (
      <div className={clazz}>
        <DummyLikely fullSize={props.fullSize}/>
      </div>
    )
  }
}


const mapStateToProps = ({ module }) => {
  return {
    module,
  }
}
export default connect(mapStateToProps)(AppLikely)
