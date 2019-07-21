import React, {Component} from 'react'
import store from '../../redux/store'
// import Likely, {
//   Facebook,
//   Twitter,
//   Vkontakte,
//   Odnoklassniki
// } from 'react-ilyabirman-likely'
import './app-likely.css'
store.subscribe((state)=>{
  if(store.getState()._window.isWindow){
    console.log('tttttttrrrrrrrrrrruuuuuuuuuueeeeeeeee', store.getState()._window.isWindow)
    import ('react-ilyabirman-likely').then(likely => console.log(likely))
  }
})
export default class AppLikely extends Component {
  render() {
    return (
      <div/>
    )
  }
}
// {/*<Likely size={'big'} skin={'default'}>*/}
// {/*  <Facebook>Share on Facebook</Facebook>*/}
// {/*  <Twitter via="your_twitter_account">Share on Twitter</Twitter>*/}
// {/*  <Vkontakte>Share on Vkontakte</Vkontakte>*/}
// {/*  <Odnoklassniki>Share on Odnoklassniki</Odnoklassniki>*/}
// {/*</Likely>*/}