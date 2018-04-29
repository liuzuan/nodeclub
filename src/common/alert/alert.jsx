import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './alert.less'

export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // 关闭弹框
    this.confirm = () => {
      this.props.closeAlert();
    };
  }

  render () {
    return (
      <ReactCSSTransitionGroup
        transitionName="alert"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        {
          this.props.alertStatus && <div className="alert">
            <div className="alert-content">
              <div className="alert-text">{this.props.alertTip}&nbsp;!</div>
              <button onClick={this.confirm} className='btn1' >确定</button>
            </div>
          </div>
        }
      </ReactCSSTransitionGroup>
    )
  }
}