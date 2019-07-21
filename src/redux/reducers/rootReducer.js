import {combineReducers} from 'redux'
import menuReducer from './menuReducer'
import windowReducer from "./windowReducer"

export const rootReducer =  combineReducers({
  menu : menuReducer,
  _window : windowReducer
});
