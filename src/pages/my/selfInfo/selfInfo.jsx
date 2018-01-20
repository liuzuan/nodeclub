import React, { Component } from 'react';
import PublicHeader from '../../../components/header/header';
import PublicFooter from '../../../components/footer/footer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './selfInfo.less';
import { user } from '../../../config/utils/getData';

class SelfInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginname: this.props.userInfo.loginname,
      user: '',
    }

  }

  async componentWillMount () {
    if (this.state.loginname) {
      let res = await user(this.state.loginname)
      if (res) {
        this.setState({
          user: res
        })
      }
    }
  }

  render () {
    var { avatar_url, loginname } = this.props.userInfo
    var { score, recent_replies, recent_topics } = this.state.user
    return (
      <div className='selfInfo-container' >
        <PublicHeader history={this.props.history} logout title='个人信息' />
        <section className='self-container' >
          <div className='user-info' >
            {loginname ?
              <section className='login' >
                <img className='user-img' src={avatar_url} alt="" />
                <p className='user-name' >{loginname}</p>
                <div>
                  <p className='score' >积分：{score}</p>
                  <p className='create-at' >注册于：一年前</p>
                </div>
              </section>
              :
              <Link className='logout' to='/signIn'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref='#icon-my'></use>
                </svg>
                <p>未登录</p>
              </Link>
            }
          </div>
        </section>
        <section className='nav' >
          <Link to='/my/message' className='nav-item' >
            <svg className="icon" aria-hidden="true">
              <use xlinkHref='#icon-14'></use>
            </svg>
            最近参与话题
            <p className='amount' >{recent_replies? recent_replies.length : 0}</p>
          </Link>
          <Link to='/my/message' className='nav-item' >
            <svg className="icon" aria-hidden="true">
              <use xlinkHref='#icon-14'></use>
            </svg>
            最近创建话题
            <p className='amount' >{recent_topics ? recent_topics.length : 0}</p>
          </Link>
          <Link to='/topics/create' className='nav-item' >
            <svg className="icon" aria-hidden="true">
              <use xlinkHref='#icon-fasong'></use>
            </svg>
            发表话题
            <p className='amount' >go</p>
          </Link>
          <Link to='/about' className='nav-item' >
            <svg className="icon" aria-hidden="true">
              <use xlinkHref='#icon-14'></use>
            </svg>
            关于
            <p className='amount' >go</p>
          </Link>
        </section>
        <PublicFooter path={this.props.match.path} />
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}))(SelfInfo)