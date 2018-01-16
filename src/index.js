import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/';
import './style/reset.less'

import registerServiceWorker from './registerServiceWorker';

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
}

render(Router)

registerServiceWorker();
