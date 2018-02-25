import React, { Component } from 'react';
import { PublicHeader } from '../../common/index';
import './about.less';

export default class About extends Component {

  render () {
    return (
      <div>
        <PublicHeader title='关于' back />
        <section className='about-container' >
          <p>功能：</p>
          <li>登录</li>
          <li>退出</li>
          <li>用户信息</li>
          <li>消息列表</li>
          <li>消息提醒</li>
          <li>个人主页</li>
          <li>消息标记为已读</li>
          <li>首页列表，上拉加载</li>
          <li>页面后退，数据还原</li>
          <li>主题详情，回复，点赞</li>
          <li>页面跳转，不再执行此页面的ajax请求</li>
          <p>技术栈：</p>
          <li>react + react-router V4 + redux + ES6/7 + less 重写cnode社区，使用webpack打包</li>
        </section>
      </div>
    )
  }
}