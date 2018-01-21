import React, { Component } from 'react';
import './user.less';
import { user } from "../../config/utils/getData";
import { formatDate } from "../../config/utils/filter";
import PublicHeader from '../../components/header/header';
import { Link } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      showingTopic: [],
      currentNavTab: 'topic',
    };
    this.getData = async (name) => { // 获取用户信息数据
      let res = await user(name)
      if (res) {
        this.setState({ data: res, showingTopic: res.recent_topics })
      }
    };
    this.navChange = (navTab) => {
      let curTab = this.state.currentNavTab
      if (navTab === 'topic' && curTab !== 'topic') {
        this.setState({showingTopic: this.state.data.recent_topics, currentNavTab: 'topic'})
      } else if (navTab === 'reply' && curTab !== 'reply') {
        this.setState({ showingTopic: this.state.data.recent_replies, currentNavTab: 'reply' })
      }
    }
  }

  async componentWillMount () {
    let loginname = this.props.match.params.id || ''
    await this.getData(loginname)
  }

  async componentWillReceiveProps (nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      let loginname = nextProps.match.params.id
      await this.getData(loginname)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.location.pathname !== this.props.location.pathname || nextState !== this.state) {
      return true
    } else {
      return false
    }
  }

  render () {
    var { avatar_url, create_at, loginname, score } = this.state.data
    let curTab = this.state.currentNavTab
    return (
      <div>
        <PublicHeader back title='用户信息' history={this.props.history} />
        {this.state.data &&
          <div className='user-container' >
            <section className='user-info' >
              <img src={avatar_url} alt="" />
              <div>
                <p className='name' >{loginname}</p>
                <p className='time' >注册：{formatDate(create_at)}</p>
                <p>积分：{score}</p>
              </div>
            </section>
            <section className='user-topic' >
              <nav>
                <p onClick={this.navChange.bind(this, 'topic')} className={curTab==='topic'? 'active':''} >发表的话题</p>
              <p onClick={this.navChange.bind(this, 'reply')} className={curTab === 'reply' ? 'active' : ''}>近期的回复</p>
              </nav>
              <div className='topic-list' >
                {this.state.showingTopic.map((item, index) => {
                  var { author, id, last_reply_at, title } = item
                  return <li className='topic-list-cell' key={id} >
                    <Link to={`/topic/${id}`} >
                      <header>
                        <img src={author.avatar_url} alt="" />
                        <p className='name' >{author.loginname}</p>
                        <p className='time' >{formatDate(last_reply_at)}</p>
                      </header>
                      <p className='title' >{title}</p>
                    </Link>
                  </li>
                })}
              </div>
            </section>
          </div>
        }
      </div>
    )
  }
}

export default User;
