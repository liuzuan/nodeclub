import React, { Component } from 'react';
import PublicHeader from '../../../components/header/header';
import PublicFooter from '../../../components/footer/footer';
import { Link } from 'react-router-dom';
import './selfInfo.less';

export default class SelfInfo extends Component {

  back = () => {
    this.props.history.goBack
    console.log(this.props.history)
  }
  render () {
    return (
      <div>
        <PublicHeader title='个人信息' />
        <section className='self_container' >
          <Link to='/signIn'>登录</Link>
          <p onClick={this.back} >返回</p>
          
        </section>
        <PublicFooter path={this.props.match.path} />
      </div>
    )
  }
}