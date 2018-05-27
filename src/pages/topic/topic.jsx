import './topic.less';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { saveTopicState } from '../../store/action';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { formatDate, scrollBar } from '../../config/utils/tool';
import { ToTop, DataLoading, PublicHeader, Alert } from '../../common/index';
import { GetTopic, collect, deCollect, ups, newReply } from '../../config/utils/getData';

/**
 * 模块入口
 */
class TopicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '', //主题详情数据
      accessToken: this.props.userInfo.accessToken || '',
      current_reply: '',
      alertStatus: false, //弹框状态
      alertTip: '', //弹框提示文字
      bottomReply: true,
      noTopic: false,
    };
    this.getData = async () => { //获取主题详情数据
      let Data = await GetTopic(this.props.match.params.id, this.state.accessToken)
      if (Data) {
        this.setState({
          data: Data, //所有数据
        })
      } else {
        this.setState({ noTopic: true })
      }
    };
    // 关闭弹框
    this.closeAlert = () => {
      this.setState({
        alertStatus: false,
        alertTip: '',
      })
    };
    // markdown文本渲染
    this.createMarkup = (html) => {
      return {
        __html: html
      }
    };
    // 前往登录页
    this.toSignin = () => {
      this.props.history.push('/signin')
    };
    // (取消)收藏主题
    this.handleCollect = async () => {
      if (this.props.userInfo.accessToken) {
        if (!this.state.data.is_collect) {
          let res = await collect(this.state.accessToken, this.state.data.id)
          if (res.success) {
            // message.info('已收藏')
            await this.getData()
          }
        } else {
          let res = await deCollect(this.state.accessToken, this.state.data.id)
          if (res.success) {
            // message.info('已取消收藏')
            await this.getData()
          }
        }
      } else {
        this.toSignin()
      }
    };
    //显示回复框
    this.showReplyBox = (index) => {
      if (this.state.accessToken) {
        this.setState({ current_reply: index })
      } else {
        this.toSignin()
      }
    };
    //评论点赞
    this.ups = async (item) => {
      if (item.author.loginname !== this.props.userInfo.loginname) {
        if (this.state.accessToken) {
          let res = await ups(item.id, this.state.accessToken)
          if (res.success) {
            await this.getData()
          }
        } else {
          this.props.history.push('/signin')
        }
      } else {
        this.setState({ alertTip: '不可对自己点赞', alertStatus: true })
      }
    };
    // 回复成功后执行回调
    this.replySuccess = () => {
      window.scrollTo(0, document.documentElement.scrollHeight)
      if (this.state.current_reply) {
        this.replyCancle()
      }
      this.cancle()
    };
    // 底部回复区获得焦点后消失，显示回复框
    this.bottomFocus = () => {
      if (this.state.accessToken) {
        this.setState({ bottomReply: false })
      } else {
        this.toSignin()
      }
    };

    this.cancle = () => {
      this.setState({ bottomReply: true })
    };

    this.replyCancle = () => {
      this.setState({ current_reply: '' })
    };

    // topic数据，Unmount前使用
    this.topicState = () => {
      let payload = {
        id: this.props.match.params.id,
        state: this.state,
        scrollBar: scrollBar()
      }
      return payload
    }
  }

  componentWillUnmount () {
    this.props.saveTopicState(this.topicState())
  }

  async componentWillMount () {
    if (this.props.state && this.props.state[this.props.match.params.id]) {
      let state = this.props.state[this.props.match.params.id]
      let left = state.scrollBar.left
      let top = state.scrollBar.top
      this.setState({
        data: state.state.data,
        current_reply: state.state.current_reply,
        accessToken: this.props.userInfo.accessToken,
      })
      setTimeout(() => { window.scrollTo(left, top) }, 20);
    } else {
      await this.getData()
    }
  }


  render () {
    return (
      <div className='topic-container' >
        <PublicHeader back title='主&nbsp;题' />
        {
          !this.state.noTopic ? (this.state.data ?
            <section>
              <Article data={this.state.data} handleCollect={this.handleCollect} createMarkup={this.createMarkup} />
              <Reply state={this.state} cancle={this.replyCancle} current_reply={this.state.current_reply} showReplyBox={this.showReplyBox}
                createMarkup={this.createMarkup} ups={this.ups} replySuccess={this.replySuccess} getData={this.getData} />
              <ReactCSSTransitionGroup
                transitionName="rise"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                {
                  this.state.bottomReply &&
                  <div className='bottom-input' onClick={this.bottomFocus}>
                    <input type="text" disabled placeholder='我想说点什么...' />
                  </div>
                }
              </ReactCSSTransitionGroup>
              <ReactCSSTransitionGroup
                transitionName="rise"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                {
                  !this.state.bottomReply &&
                  <div className='reply' >
                    <ReplyBox getData={this.getData} replySuccess={this.replySuccess}
                      toSignin={this.toSignin} cancle={this.cancle} data={{ accessToken: this.state.accessToken, topic_id: this.state.data.id }} />
                  </div>
                }
              </ReactCSSTransitionGroup>
            </section> :
            <div className='loading' ><DataLoading /></div>
          ) : <div className='no-topic' >话题不存在或已被删除...</div>
        }
        <Alert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} />
        <ToTop />
      </div>
    );
  }
}

/**
 * 文章展示部分
 */
class Article extends Component {
  render () {
    var { title, author, is_collect, content, create_at } = this.props.data
    return (
      <div>
        <section className='article_content'>
          <div className='author'>
            <Link to={`/user/${author.loginname}`}>
              <img className='author_avatar' src={author.avatar_url} alt="" />
              <div className='name-time' >
                <p className='author-name'>{author.loginname}</p>
                <p className='create-at' >{formatDate(create_at)}</p>
              </div>
            </Link>
            <span onClick={this.props.handleCollect} className={is_collect ? 'isCollect' : 'collect'}>
              <svg className='icon' aria-hidden="true">
                <use xlinkHref='#icon-love'></use>
              </svg>
            </span>
          </div>
          <p className='topic_title'>{title}</p>
          <div className='markdown' dangerouslySetInnerHTML={this.props.createMarkup(content)} />
        </section>
      </div>
    )
  }
}

/**
 * 回复展示部分
 */
class Reply extends Component {
  render () {
    let { replies } = this.props.state.data
    return (
      <div>
        {
          replies && replies.length > 0 &&
          <section className='replies_content'>
            <header className='replies_header'>
              共<span>{replies.length}</span>条回复
            </header>
            {
              replies.map((item, index) => {
                var { id, content, author, ups, create_at, is_uped } = item;
                return <li className='reply_list' key={id}>
                  <section className='reply_author' >
                    <Link to={`/user/${author.loginname}`}>
                      <img className='reply_avatar' src={author.avatar_url} alt="" />
                      <div className='name_time'>
                        <p className='reply_author_name' >{author.loginname}</p>
                        <p className='create_at'>{formatDate(create_at)}</p>
                      </div>
                    </Link>
                    <span className='reply_floor' >{index + 1}楼</span>
                  </section>
                  <section className='reply_content' dangerouslySetInnerHTML={this.props.createMarkup(content)} ></section>
                  <div className='operation'>
                    <span className='click-reply' onClick={e => { this.props.showReplyBox(index, e) }} >
                      <svg className='icon' aria-hidden="true">
                        <use xlinkHref='#icon-iconfonthuifu'></use>
                      </svg>
                    </span>
                    <span className='count' >{ups.length}</span>
                    <span className={is_uped ? 'is_uped' : 'click-zan'} onClick={() => { this.props.ups(item) }} >
                      <svg className='icon' aria-hidden="true">
                        <use xlinkHref='#icon-good'></use>
                      </svg>
                    </span>
                  </div>
                  <ReactCSSTransitionGroup
                    transitionName="rise"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {
                      this.props.state.current_reply === index &&
                      <ReplyBox placeholder={`@${author.loginname}`} getData={this.props.getData}
                        replySuccess={this.props.replySuccess} cancle={this.props.cancle} loginname={author.loginname}
                        data={{ accessToken: this.props.state.accessToken, topic_id: this.props.state.data.id, reply_id: id }} />
                    }
                  </ReactCSSTransitionGroup>
                </li>
              })
            }
          </section>
        }
      </div>
    )
  }
}

/**
 * 回复框
 */
class ReplyBox extends Component {
  state = {
    alertStatus: false,
    alertTip: '',
  }
  // 关闭弹窗
  closeAlert = () => {
    this.setState({
      alertStatus: false,
      alertTip: '',
    })
  };

  cancle = () => {
    this.props.cancle()
  }

  // 提交回复
  submit = async () => {
    let data = this.props.data
    let reply_id, content
    let alertTip
    if (this.refs.content.value) {
      if (data.reply_id) {
        reply_id = data.reply_id
        content = this.props.placeholder + ' ' + this.refs.content.value
      } else {
        reply_id = ''
        content = this.refs.content.value
      }
      let res = await newReply(data.topic_id, data.accessToken, reply_id, content)
      if (res.success) {
        alertTip = '回复成功'
        await this.props.getData()
        setTimeout(() => {
          this.props.replySuccess()
        }, 1500);
      }
    } else {
      alertTip = '内容不能为空'
    }
    this.setState({
      alertStatus: true,
      alertTip: alertTip,
    })
  }

  render () {
    return (
      <div className='reply-box' >
        <textarea className='textarea' autoFocus ref='content' placeholder={this.props.placeholder} ></textarea>
        <div className='btns'>
          <input className='btn' onClick={this.cancle} type="button" value='取 消' />
          <input className='btn' onClick={this.submit} type="button" value='回 复' />
        </div>
        <Alert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} />
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo,
  state: state.topic,
}), {
    saveTopicState
  })(TopicDetail);