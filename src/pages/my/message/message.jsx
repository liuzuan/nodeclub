import React, { Component } from 'react';
import PublicHeader from '../../../components/header/header';
import PublicFooter from '../../../components/footer/footer';

export default class Message extends Component {

  render () {
    return (
      <div>
        <PublicHeader avatar title='个人消息'>
          </PublicHeader>
        <section>

        </section>
        <PublicFooter path={this.props.match.path} />
      </div>
    )
  }
}