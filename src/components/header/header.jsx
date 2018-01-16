import React, { Component } from 'react';
import './header.less'
// import { Link } from 'react-router-dom';

export default class PublicHeader extends Component {

  render () {
    return (
      <header className='header_container'>
        <span className='left' >
          {this.props.back &&
            <svg className="icon" aria-hidden="true">
              <use xlinkHref='#icon-back'></use>
            </svg>
          }
          {this.props.avatar &&
            <img src="" alt=""/>
          }
        </span>
        <span>{this.props.title}</span>
        <span className='right' onClick={this.goBack} >
          {this.props.children}
        </span>
      </header >
    )
  }

}