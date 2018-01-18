import React, { Component } from 'react';
import PublicHeader from '../../components/header/header';
import PublicFooter from '../../components/footer/footer';
import './create.less';

export default class Create extends Component {

  render () {
    return (
      <div>
        <PublicHeader avatar sent title='发&nbsp;表' />
        <section>

        </section>
        <PublicFooter path={this.props.match.path} />
      </div>
    )
  }
} 