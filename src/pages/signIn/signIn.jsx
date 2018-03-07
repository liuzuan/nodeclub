import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PublicHeader } from '../../common/index';
import './signIn.less'
import { Login } from '../../config/utils/getData';
import { saveUserInfo } from '../../store/action';
import { setItem } from '../../config/utils/tool';
import { message } from 'antd';



class SignIn extends Component {
  state = {
    accessToken: '',
    from: '',
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
        if (this.state.from) {
          this.props.history.push(`${this.state.from}`)
        } else {
          this.props.history.goBack()
        }
      } else {
        message.info('登录失败')
      }
    } else {
      message.info('请输入accessToken')
    }
  }

  componentWillMount () {
    if (this.props.location.state) {
      this.setState({ from: this.props.location.state.from.pathname })
    }
  }

  render () {
    return (
      <div>
        <PublicHeader title='登&nbsp;录' back />
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