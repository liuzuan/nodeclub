import React, { Component } from 'react';
import './header.scss'

export default class PublicHeader extends Component {

  render () {
    return (
      <header className='container'>
        <span></span>
        <span>{this.props.title}</span>
        <span></span>
      </header>
    )
  }

}