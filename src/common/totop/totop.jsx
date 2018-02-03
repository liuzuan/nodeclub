import React, { Component } from 'react';
import { BackTop } from 'antd';
import './totop.less';

export default class ToTop extends Component {
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