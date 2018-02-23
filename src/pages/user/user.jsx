import React, { Component } from 'react';
import './user.less';
import { user } from "../../config/utils/getData";
import { formatDate } from "../../config/utils/tool";
import { Link } from "react-router-dom";
import { Anchor } from 'antd';
import { NullData, PublicHeader } from '../../common/index';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',//用户所有数据
      showingTopic: [],//展示中的话题or回复
      currentNavTab: '',
    };

    this.getData = async (name) => { // 获取用户信息数据
      let type = this.props.location.state ? this.props.location.state.type : 'recent_topics'
      let res = await user(name)
      if (res) {
        this.setState({
          data: res, showingTopic: res[type ? type : 'recent_topics'],
          currentNavTab: type
        })
      }
    };

    this.navChange = (navTab) => {
      let curTab = this.state.currentNavTab
      if (navTab === 'recent_topics' && curTab !== 'recent_topics') {
        this.setState({ showingTopic: this.state.data.recent_topics, currentNavTab: 'recent_topics' })
      } else if (navTab === 'recent_replies' && curTab !== 'recent_replies') {
        this.setState({ showingTopic: this.state.data.recent_replies, currentNavTab: 'recent_replies' })
      }
    }
  }

  async componentWillMount () {
    let loginname = this.props.match.params.id
    await this.getData(loginname)
  }

  render () {
    var { avatar_url, create_at, loginname, score } = this.state.data
    let curTab = this.state.currentNavTab
    return (
      <div>
        <PublicHeader back title='用户信息' />
        {this.state.data &&
          <main className='user-container' >
            <section className='user-info' >
              <img src={avatar_url} alt="" />
              <div>
                <p className='name' >{loginname}</p>
                <p>积分：{score}</p>
                <p className='time' >注册：{formatDate(create_at)}</p>
              </div>
            </section>
            <section className='user-topic' >
              <Anchor offsetTop={49}>
                <nav>
                  <p onClick={this.navChange.bind(this, 'recent_topics')} className={curTab === 'recent_topics' ? 'active' : ''} >发表的话题</p>
                  <p onClick={this.navChange.bind(this, 'recent_replies')} className={curTab === 'recent_replies' ? 'active' : ''}>回复的话题</p>
                </nav>
              </Anchor >
              <div className='topic-list' >
                {this.state.showingTopic.length ?
                  this.state.showingTopic.map((item, index) => {
                    let { author, id, last_reply_at, title } = item
                    return <li className='topic-list-cell' key={id} >
                      <Link to={`/topic/${id}`} >
                        <header>
                          <img src={author.avatar_url} alt="" />
                          <p className='name' >{author.loginname}</p>
                          <p className='time' >{formatDate(last_reply_at)}</p>
                        </header>
                        <p className='title' >主题：{title}</p>
                      </Link>
                    </li>
                  }) :
                  <div className='nomsg' ><NullData /></div>
                }
              </div>
            </section>
          </main>
        }
      </div>
    )
  }
}

export default User;
