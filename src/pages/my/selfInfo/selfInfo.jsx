import React, { Component } from 'react';
import { PublicHeader, PublicFooter } from '../../../common/index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './selfInfo.less';
import { user } from '../../../config/utils/getData';
import { formatDate } from '../../../config/utils/tool';

class SelfInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginname: this.props.userInfo.loginname || '',
      user: '',
      navList: [
        { id: '1', title: '最近发表', route: `/user/${this.props.userInfo.loginname}`, icon: '#icon-14', type: 'recent_topics' },
        { id: '2', title: '最近回复', route: `/user/${this.props.userInfo.loginname}`, icon: '#icon-14', type: 'recent_replies' },
        { id: '3', title: '发表话题', route: '/topic/create', icon: '#icon-fasong' },
        { id: '4', title: '关于', route: '/about', icon: '#icon-svgabout' },
      ]
    };
    this.navClick = (item) => {
      if(item.id === '3') {
        this.props.history.push({ pathname: item.route, state: { from: this.props.location } })
      } else if(item.id === '4') {
        this.props.history.push('/about')
      } else {
        if(this.props.userInfo.loginname) {
          this.props.history.push({ pathname: item.route, state: { type: item.type } })
        } else {
          this.props.history.push('/signin')
        }
      }
    }
  }

  async componentWillMount() {
    if(this.state.loginname) {
      let res = await user(this.state.loginname)
      if(res) {
        this.setState({ user: res })
      }
    }

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userInfo.loginname === '') {
      this.setState({ user: '' })
    }
  }

  render() {
    var { avatar_url, loginname } = this.props.userInfo
    var { score, recent_replies, recent_topics, create_at } = this.state.user
    return(
      <div className='selfInfo-container' >
        <PublicHeader logout title='个人信息' />
        <section className='self-container' >
          <div className='user-info' >
            {loginname ?
              <section className='login' >
                <img className='user-img' src={avatar_url} alt="" />
                <p className='user-name' >{loginname}</p>
                <div>
                  <p className='score' >积分：{score}</p>
                  <p className='create-at' >注册于：{formatDate(create_at)}</p>
                </div>
              </section> :
              <Link className='logout' to='/signIn'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref='#icon-my'></use>
                </svg>
                <p>未登录</p>
              </Link>
            }
          </div>
        </section>
        <section className='nav' >
          {this.state.navList.map(item => {
            return <li onClick={this.navClick.bind(this, item)} className='nav-item' key={item.id} >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref={item.icon}></use>
              </svg>
              {item.title}
              <p className='amount' >
                {item.title === '最近回复' ? (recent_replies ? recent_replies.length : 0) : (item.title === '最近发表' ? (recent_topics ? recent_topics.length : 0) : 'go')}
              </p>
            </li>
          })}
        </section>
        <PublicFooter />
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}))(SelfInfo)