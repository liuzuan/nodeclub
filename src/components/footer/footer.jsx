import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './footer.less'

export default class PublicFooter extends Component {

  state = {
    list: [
      { title: '首页', route: '/', icon: '' },
      { title: '发表', route: '/create', icon: '' },
      { title: '消息', route: '/message', icon: '' },
      { title: '我的', route: '/self', icon: '' },
    ]
  }

  render () {
    return (
      <footer className='footer_container'>
        {
          this.state.list.map((item, index) => {
            return <Link to='' className={?'active':''} key={index} ><p onClick={console.log(this.props)} >{item.title}</p></Link>
          })
        }
      </footer>
    )
  }
}