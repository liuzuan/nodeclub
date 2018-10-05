import React from 'react';
import store from './store/'
import Router from './router/';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import './style/reset.less';
import './assets/iconfonts/iconfont.js';
import './config/utils/px2rem';
import registerServiceWorker from './registerServiceWorker';
import { saveUserInfo } from './store/action.js'
import { getItem } from './config/utils/tool';
import initReactFastclick from 'react-fastclick'

//解决移动端300毫秒延迟
initReactFastclick()

// 监听state变化
// store.subscribe(() => {
//   console.log('store发生了变化', store.getState());
// });

if (localStorage.userInfo) {
  store.dispatch(saveUserInfo(getItem('userInfo')))
}

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
      <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
}

render(Router)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    render(Router);
  })
}

registerServiceWorker();
