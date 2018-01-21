import React, { Component } from 'react';
import { BackTop } from 'antd';
import './backTop.less';

export default class GoTop extends Component{
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