import React from 'react';
import store from './store/store'
import Router from './router/';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './style/reset.less';
import './assets/iconfonts/iconfont.js';
import registerServiceWorker from './registerServiceWorker';
import { saveUserInfo } from './store/action.js'
import { getItem } from './config/utils/localStorage';


// 监听state变化
store.subscribe(() => {
  console.log('store发生了变化', store.getState());
});

if (localStorage.accessToken) {
  store.dispatch(saveUserInfo(getItem('accessToken'), getItem('userInfo')))
}

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  )
}

render(Router)

registerServiceWorker();
