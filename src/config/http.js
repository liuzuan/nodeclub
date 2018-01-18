import {
  baseUrl
} from './api';
import axios from 'axios';

axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  err => {
    // 对请求错误做些什么
    return Promise.reject(err);
  });

// 添加响应拦截器
axios.interceptors.response.use(
response => {
  // 对响应数据做点什么
  return response;
},
err => {
  
  return Promise.reject(err);
});

export default (method, url, data) => {
  if (method === 'get') {
    let arr = []
    if (data) {
      Object.keys(data).forEach(k => {
        arr.push(`${k}=${data[k]}`)
      })
      arr = arr.join('&')
    }
    let Url = baseUrl + url + '?' + arr
    return axios.get(Url).then(res => res.data.data)
      .catch(err => {
        
    })
  } else {
    let Url = baseUrl + url
    return axios.post(Url, data).then(res => res.data)
      .catch(err => {

    })
  }
}