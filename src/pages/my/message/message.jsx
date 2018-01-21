import React, { Component } from 'react';
import PublicHeader from '../../../components/header/header';
import PublicFooter from '../../../components/footer/footer';
import './message.less';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMsg } from '../../../config/utils/getData';
import { formatDate } from '../../../config/utils/filter';

/**
 * 模块入口
 */
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],//所有消息
      showingMsg: [],// 展示中的消息
    };
    this.getMessage = async () => {
      let res = await getMsg(this.props.accessToken)
      this.setState({ message: res, showingMsg: res.has_read_messages })
      console.log(this.state.showingMsg)
    };
    this.createMarkup = (html) => {
      return {
        __html: html
      }
    }
  }

  async componentWillMount () {
    await this.getMessage()
  }

  componentWillReceiveProps (nextProps) {
    // console.log(nextProps.match.params.id)
    // if (this.props !== nextProps) {
    //   if (nextProps.match.params.id === 'hasnot_read') {
    //     this.setState({ showingMsg: this.state.message.hasnot_read_messages })
    //   } else {
    //     this.setState({ showingMsg: this.state.message.has_read_messages })
    //   }
    // }
    console.log(nextProps)
  }

  

  render () {
    return (
      <div>
        <PublicHeader avatar title='个人消息'></PublicHeader>
        <section className='message-content'>
          <nav>
            <NavLink to='/my/message/has_read' activeClassName='activeTab' >
              <p>已读消息</p>
            </NavLink>
            <NavLink to='/my/message/hasnot_read' activeClassName='activeTab' >
              <p>未读消息</p>
            </NavLink>
          </nav>
          <div className='message-list'>
            {this.state.showingMsg.map((item, index) => {
              var { author, create_at, reply, topic, type } = item
              return <li className='list-cell' key={item.id} >
                <img src={author.avatar_url} alt="" />
                <div>
                  <p className='name-time' >
                    <span className='name' >{author.loginname}</span>
                    <span className='time' >{formatDate(create_at)}</span>
                  </p>
                  <p className='type' >在话题<Link to={`/topic/${topic.id}`} >{topic.title}</Link>中{type === 'reply' ? '回复' : '@'}了你</p>
                </div>
                <section >
                  <p dangerouslySetInnerHTML={this.createMarkup(reply.content)}></p>
                </section>
              </li>
            })}
          </div>
        </section>
        <PublicFooter path={this.props.match.path} />
      </div>
    )
  }
}

export default connect(state => ({
  accessToken: state.userInfo.accessToken
}))(Message)