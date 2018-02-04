import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { clearUserInfo } from '../../store/action';
import { removeItem } from '../../config/utils/tool';
import { connect } from 'react-redux';
import { message } from 'antd';
import './header.less';

class PublicHeader extends Component {

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
          { // 返回按钮
            this.props.back &&
            <svg onClick={this.goBack.bind(this)} className="icon" aria-hidden="true">
              <use xlinkHref='#icon-back'></use>
            </svg>
          }
          { // 登录成功显示头像
            this.props.avatar && this.props.userInfo.avatar_url &&
            <Link to='/my/selfInfo'>
              <img src={this.props.userInfo.avatar_url} alt="" />
            </Link>
          }
          { //  未登录时的头像图标
            !this.props.userInfo.avatar_url && this.props.avatar &&
            <Link to='/signIn' >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref='#icon-my'></use>
              </svg></Link>
          }
        </span>
        <span>{this.props.title}</span>
        <span className='right'>
          { // 发表页面的发表图标
            this.props.sent &&
            <svg onClick={this.props.submit} className="icon" aria-hidden="true">
              <use xlinkHref='#icon-fasong'></use>
            </svg>
          }
          {// 用户页面的退出按钮
            this.props.logout &&
            <svg onClick={this.logout} className="icon" aria-hidden="true">
              <use xlinkHref='#icon-084tuichu'></use>
            </svg>
          }
        </span>
      </header>
    )
  }
}

export default withRouter(connect((state) => ({
  userInfo: state.userInfo
}), { clearUserInfo })(PublicHeader))
