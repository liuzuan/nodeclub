import React, { Component } from 'react';
import PublicHeader from '../../components/header/header';
import './signIn.less'
export default class SignIn extends Component {

  componentDidMount () {
    console.log(this.props.history)
  }

  render () {
    return(
      <div>
        <PublicHeader title='登&nbsp;录' back />
        <section>

        </section>
      </div>
    )
  }
}

