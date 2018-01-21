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

export default class RouteConfig extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={home} />
          <Route path='/topic/create' exact component={create} />
          <Route path='/my/selfInfo' exact component={selfInfo} />
          <Route path='/my/message' exact component={message} />
          <Route path="/topic/:id" component={topic} />
          <Route path='/user/:id' component={user} />
          <Route path='/signIn' component={signIn} />
          <Route path='/about' component={about} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </Router>
    )
  }
}