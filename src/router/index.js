import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import home from '../pages/home/home';
import topic from '../pages/topic/topic'

export default class RouteConfig extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={home} />
          <Route path="/topic/:id" exact component={topic} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    )
  }
}