import React, { Component } from 'react';
import './header.less';
import { clearUserInfo } from '../../store/action';
import { removeItem } from '../../config/utils/tool';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';




class PublicHeader extends Component {
  static propType = {
    accessToken: PropTypes.string
  }

  goBack () {
    this.props.history.goBack()
  }

  logout = () => {
    if (this.props.userInfo.loginname) {
      this.props.clearUserInfo()
      removeItem('userInfo')
      message.info('已退出登录')
    } else {
      message.info('尚未登录')
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
          {this.props.avatar && this.props.userInfo.avatar_url &&
            <Link to='/my/selfInfo'>
              <img src={this.props.userInfo.avatar_url} alt="" />
            </Link>
          }
          {!this.props.userInfo.avatar_url && this.props.avatar &&
            <Link to='/signIn' >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref='#icon-my'></use>
              </svg></Link>
          }
        </span>
        <span>{this.props.title}</span>
        <span className='right'>
          {this.props.sent &&
            <svg onClick={this.props.submit} className="icon" aria-hidden="true">
              <use xlinkHref='#icon-fasong'></use>
            </svg>
          }
          {
            this.props.logout &&
            <svg onClick={this.logout} className="icon" aria-hidden="true">
              <use xlinkHref='#icon-084tuichu'></use>
            </svg>
          }
        </span>
      </header >
    )
  }
}


export default withRouter(connect((state) => ({
  userInfo: state.userInfo
}), { clearUserInfo })(PublicHeader))
