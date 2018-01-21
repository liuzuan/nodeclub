import React, { Component } from 'react';
import PublicHeader from '../../../components/header/header';
import PublicFooter from '../../../components/footer/footer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './selfInfo.less';
import { user } from '../../../config/utils/getData';
import { formatDate } from '../../../config/utils/filter';

class SelfInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginname: this.props.userInfo.loginname || '',
      user: '',
      navList: [
        { title: '最近参与话题', route: '/my/message', icon: '#icon-14' },
        { title: '最近创建话题', route: '/my/message', icon: '#icon-14' },
        { title: '发表话题', route: '/topic/create', icon: '#icon-fasong' },
        { title: '关于', route: '/about', icon: '#icon-svgabout' },
      ]
    }

  }

  async componentWillMount () {
    if (this.state.loginname) {
      let res = await user(this.state.loginname)
      if (res) {
        this.setState({ user: res })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.userInfo.loginname === '') {
      this.setState({ user: '' })
    }
  }

  render () {
    var { avatar_url, loginname } = this.props.userInfo
    var { score, recent_replies, recent_topics, create_at } = this.state.user
    return (
      <div className='selfInfo-container' >
        <PublicHeader history={this.props.history} logout title='个人信息' />
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
              </section>
              :
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
            return <Link to={item.route} className='nav-item' key={item.title} >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref={item.icon}></use>
              </svg>
              {item.title}
              <p className='amount' >
                {item.title === '最近参与话题' ? (recent_replies ? recent_replies.length : 0) : (item.title === '最近创建话题'? (recent_topics ? recent_topics.length : 0):'go')}
              </p>
            </Link>
          })}
        </section>
        <PublicFooter path={this.props.match.path} />
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}))(SelfInfo)