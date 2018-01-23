import React, { Component } from 'react';
import { BackTop } from 'antd';
import './index.less';
import { Spin } from 'antd';

export class NullData extends Component {
  render () {
    return (
      <div className='nullData' >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref='#icon-changyonghuifu'></use>
        </svg>
        <p className='msg' >暂无消息</p>
      </div>
    )
  }
}

export class ToTop extends Component {
  render () {
    return (
      <div className='ToTop' >
        <BackTop>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref='#icon-top'></use>
          </svg>
        </BackTop>
      </div>
    )
  }
}


export class DataLoading extends Component {
  render () {
    return (
      <div className="loading">
        <Spin tip='加载中...' delay={500} />
      </div>
    )
  }
}



