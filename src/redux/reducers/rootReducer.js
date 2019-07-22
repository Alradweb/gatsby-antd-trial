import { combineReducers } from "redux"
import menuReducer from "./menuReducer"
import windowReducer from "./windowReducer"
import moduleLoaderIndicator from "./moduleLoaderIndicator"

export const rootReducer = combineReducers({
  menu: menuReducer,
  _window: windowReducer,
  module: moduleLoaderIndicator,
})
