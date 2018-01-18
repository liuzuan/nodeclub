import React, { Component } from 'react';
import './header.less';
import store from '../../store/store';
import { logout } from '../../store/action';
import { removeItem } from '../../config/utils/localStorage';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';


class PublicHeader extends Component {

  state = {
    img: ''
  }

  componentWillMount () {
    let isLogin = store.getState().userInfo.userInfo
    if (isLogin) {
      this.setState({
        img: isLogin.avatar_url
      })
    }
  }
  goBack () {
    this.props.history.goBack()
  }

  logout () {
    if (store.getState().userInfo.userInfo) {
      logout('')
      removeItem('userInfo')
      removeItem('accessToken')
      this.props.history.push('/')
    } else {
      console.log('尚未登录')
    }

  }
  render () {
    return (
      <header className='header_container'>
        <span className='left' >
          {this.props.back &&
            <svg onClick={this.goBack.bind(this)} className="icon" aria-hidden="true">
              <use xlinkHref='#icon-back'></use>
            </svg>
          }
          {this.props.avatar && this.state.img &&
            <Link to='/my/selfInfo'>
              <img src={this.state.img} alt="" />
            </Link>
          }
          {!this.state.img && this.props.avatar &&
            <Link to='/signIn' >登录</Link>
          }
        </span>
        <span>{this.props.title}</span>
        <span className='right'>
          {this.props.sent &&
            <svg onClick={this.goBack.bind(this)} className="icon" aria-hidden="true">
              <use xlinkHref='#icon-fasong'></use>
            </svg>
          }
          {this.props.logout &&
            <svg onClick={this.logout.bind(this)} className="icon" aria-hidden="true">
              <use xlinkHref='#icon-084tuichu'></use>
            </svg>
          }
        </span>
      </header >
    )
  }
}

export default PublicHeader
