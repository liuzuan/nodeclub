import React, { Component } from 'react';
import { BackTop } from 'antd';
import './index.less';

export class NullData extends Component {
  render() { 
    return (
      <div className='nullData' >
        <p>暂无消息</p>
      </div>
    )
  }
}

export class ToTop extends Component {
  render () {
    return (
      <div className='backTop' >
        <BackTop>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref='#icon-top'></use>
          </svg>
        </BackTop>
      </div>
    )
  }
}


 
