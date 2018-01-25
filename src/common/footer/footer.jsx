import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import './footer.less'

class PublicFooter extends Component {

  state = {
    list: [
      { title: '首页', route: '/', icon: '#icon-home' },
      { title: '发表', route: '/topic/create', icon: '#icon-daifasong' },
      { title: '消息', route: '/my/message', icon: '#icon-14' },
      { title: '我的', route: '/my/selfInfo', icon: '#icon-account' },
    ]
  }

  render () {
    return (
      <footer className='footer_container'>
        {
          this.state.list.map((item, index) => {
            return <Link to={`${item.route}`} className={this.props.match.path === item.route? 'active':''} key={index}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref={item.icon}></use>
              </svg>
              <p>{item.title}</p>
            </Link>
          })
        }
      </footer>
    )
  }
}

export default withRouter(PublicFooter)