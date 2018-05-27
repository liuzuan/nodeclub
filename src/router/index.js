import React, { Component } from 'react';
import asyncComponent from '../config/utils/asyncComponent'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import home from '@/pages/home/home';

const user = asyncComponent(() => import('@/pages/user/user'));
const about = asyncComponent(() => import('@/pages/about/about'));
const topic = asyncComponent(() => import('@/pages/topic/topic'));
const create = asyncComponent(() => import('@/pages/create/create'));
const signIn = asyncComponent(() => import('@/pages/signIn/signIn'));
const message = asyncComponent(() => import('@/pages/my/message/message'));
const selfInfo = asyncComponent(() => import('@/pages/my/selfInfo/selfInfo'));

export default class RouteConfig extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={home} />
          <Route path='/topic/create' exact component={create} />
          <Route path='/my/selfInfo' component={selfInfo} />
          <Route path='/my/message' component={message} />
          <Route path='/topic/:id' component={topic} />
          <Route path='/user/:id' component={user} />
          <Route path='/signIn' component={signIn} />
          <Route path='/about' component={about} />
          <Redirect to='/' />
        </Switch>
      </Router>
    )
  }
}