import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import home from '../pages/home/home';
import user from '../pages/user/user';
import about from '../pages/about/about';
import topic from '../pages/topic/topic';
import create from '../pages/create/create';
import signIn from '../pages/signIn/signIn';
import message from '../pages/my/message/message';
import selfInfo from '../pages/my/selfInfo/selfInfo';

const requireAuth = (nextState, replace, next) => {
  console.log(1111)
  // if (localStorage.userInfo) {
  //   console.log(333)
  //   next()
  // } else {
  //   replace('/signIn')
  //   console.log(nextState,222)
  //   next()
  // }
}
export default class RouteConfig extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={home} />
          <Route path='/my/message' onEnter={requireAuth} component={message} />
          <Route path='/topic/create' onEnter={requireAuth} exact component={create} />
          <Route path='/my/selfInfo' onEnter={requireAuth} exact component={selfInfo} />
          <Route path="/topic/:id" component={topic} />
          <Route path='/user/:id' component={user} />
          <Route path='/signIn' component={signIn} />
          <Route path='/about' component={about} />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}