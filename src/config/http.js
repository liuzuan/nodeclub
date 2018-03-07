import { baseUrl } from './api';
import axios from 'axios';


export default(method, url, data) => {
  if(method === 'get') {
    let arr = []
    if(data) {
      Object.keys(data).forEach(k => {
        arr.push(`${k}=${data[k]}`)
      })
      arr = arr.join('&')
    }
    let Url = baseUrl + url + '?' + arr
    return axios.get(Url).then(res => res.data.data).catch(err => {})
  } else {
    let Url = baseUrl + url
    return axios.post(Url, data).then(res => res.data).catch(err => {})
  }







}