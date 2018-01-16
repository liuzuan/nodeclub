import React, { Component } from 'react';
import PublicHeader from '../../../components/header/header';
import PublicFooter from '../../../components/footer/footer';

export default class Message extends Component {

  render () {
    return (
      <div>
        <PublicHeader title='个人消息' />
        <section>

        </section>
        <PublicFooter path={this.props.match.path} />
      </div>
    )
  }
}