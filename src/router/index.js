import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import home from '../pages/home/home';
import topic from '../pages/topic/topic';
import create from '../pages/create/create';
import message from '../pages/my/message/message';
import selfInfo from '../pages/my/selfInfo/selfInfo';
import signIn from '../pages/signIn/signIn';
import about from '../pages/about/about';

export default class RouteConfig extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={home} />
          <Route path="/topic/:id" component={topic} />
          <Route path='/topics/create' exact component={create} />
          <Route path='/my/message' exact component={message} />
          <Route path='/my/selfInfo' exact component={selfInfo} />
          <Route path='/signIn' component={signIn} />
          <Route path='/about' component={about} />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}