import React, { Component } from 'react';
import './dataLoading.less';
import { Spin } from 'antd';

export default class DataLoading extends Component {
  render () {
    return (
      <div className="loading">
        <Spin tip='加载中...' delay={500} />
      </div>
    )
  }
}