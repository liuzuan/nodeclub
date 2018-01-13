import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/home/home'
import './style/reset.scss'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
