import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PublicHeader from '../../common/header/header';
import './signIn.less'
import { Login } from '../../config/utils/getData';
import { saveUserInfo } from '../../store/action';
import { setItem } from '../../config/utils/localStorage'
import { message } from 'antd';

class SignIn extends Component {
  static propTypes = {
    saveUserInfo: PropTypes.func.isRequired,
  }

  state = {
    accessToken: '',
  }

  handleChange (e) {
    this.setState({
      accessToken: e.target.value
    })
  }

  async login (event) {
    if (this.state.accessToken) {
      let res = await Login(this.state.accessToken)
      if (res) {
        message.info('登录成功')
        res.accessToken = this.state.accessToken
        this.props.saveUserInfo(res)
        setItem('userInfo', res)
        this.props.history.goBack()
      } else {
        message.info('登录失败')
      }
    } else {
      message.info('请输入accessToken')
    }
  }

  render () {
    return (
      <div>
        <PublicHeader history={this.props.history} title='登&nbsp;录' back />
        <form className='signIn_container' >
          <input className='text' type="text" value={this.state.accessToken}
            onChange={this.handleChange.bind(this)} placeholder='AccessToken' />
          <input className='submit' type="button" value='登&nbsp;录'
            onClick={this.login.bind(this)} />
        </form>
      </div>
    )
  }
}

export default connect(state => ({}), {
    saveUserInfo,
})(SignIn);

