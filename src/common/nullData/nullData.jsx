import React, { Component } from 'react';
import './nullData.less'

export default class NullData extends Component {
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