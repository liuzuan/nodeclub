import React, { Component } from 'react';
import './header.less'

export default class PublicHeader extends Component {

  render () {
    return (
      <header className='header_container'>
        <span>

        </span>
        <span>{this.props.title}</span>
        <span></span>
      </header >
    )
  }

}