import React, { Component } from 'react';
import './header.css'

export default class PublicHeader extends Component {

  render () {
    return (
      <header className='container'>
        <span>{this.props.title}</span>
        <span>{this.props.name}</span>
        
      </header>
    )
  }

}