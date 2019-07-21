import React, {Component} from 'react';
import Likely, {
  Facebook,
  Twitter,
  Vkontakte,
  Odnoklassniki
} from 'react-ilyabirman-likely'
import './app-likely.css'
export default class AppLikely extends Component {
  render() {
    return (
      <Likely size={'big'} skin={'default'}>
        <Facebook>Share on Facebook</Facebook>
        <Twitter via="your_twitter_account">Share on Twitter</Twitter>
        <Vkontakte>Share on Vkontakte</Vkontakte>
        <Odnoklassniki>Share on Odnoklassniki</Odnoklassniki>
      </Likely>
    )
  }
}