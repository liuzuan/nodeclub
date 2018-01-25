import React, { Component } from 'react';
import './topic.less';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { message } from 'antd';
import PublicHeader from '../../common/header/header';
import { formatDate } from '../../config/utils/tool';
import { ToTop, DataLoading } from '../../common/index';
import { GetTopic, collect, deCollect, ups, newReply } from '../../config/utils/getData';

/**
 * 模块入口
 */
class TopicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',//主题详情数据
      accessToken: this.props.userInfo.accessToken || '',
      current_reply: '',
    };
    this.getData = async () => { //获取主题详情数据
      let Data = await GetTopic(this.props.match.params.id, this.state.accessToken)
      this.setState({
        data: Data,//所有数据
      })
    };
    this.createMarkup = (html) => { // markdown文本渲染
      return {
        __html: html
      }
    };
    this.handleCollect = async () => { // (取消)收藏主题
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
        this.props.history.push('/signin')
      }
    };
    this.showReplyBox = (index) => { //显示回复框
      if (this.state.accessToken) {
        this.setState({ current_reply: index })
      } else {
        this.props.history.push('/signin')
      }
    };
    this.ups = async (item) => { //评论点赞
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
        message.info('不可对自己点赞')
      }
    };
    this.replySuccess = () => {//提交回复成功后关闭回复框
      this.setState({
        current_reply: ''
      })
    }
  }

  async componentWillMount (state) {
    await this.getData()
  }


  render () {
    return (
      <div className='topic-container' >
        <PublicHeader back title='主&nbsp;题' />
        {this.state.data ?
          <section>
            <Article data={this.state.data} handleCollect={this.handleCollect} createMarkup={this.createMarkup} />
            <Reply state={this.state} current_reply={this.state.current_reply} showReplyBox={this.showReplyBox}
              createMarkup={this.createMarkup} ups={this.ups} replySuccess={this.replySuccess} getData={this.getData} />
            <div className='reply' >
              <ReplyBox getData={this.getData} replySuccess={this.replySuccess} data={{ accessToken: this.state.accessToken, topic_id: this.state.data.id }} />
            </div>
          </section> :
          <div className='loading' ><DataLoading /></div>
        }
        <ToTop />
      </div >
    );
  }
}

/**
 * 主题文章部分
 */
class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render () {
    var { title, author, is_collect, content, create_at } = this.props.data
    return (
      <div>
        <section className='article_content'>
          {author &&
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
          }
          <p className='topic_title'>{title}</p>
          <div className='markdown' dangerouslySetInnerHTML={this.props.createMarkup(content)} />
        </section>
      </div>
    )
  }
}

/**
 * 主题回复部分
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
                      <div className='name_time' >
                        <p className='reply_author_name' >{author.loginname}</p>
                        <p className='create_at'>{formatDate(create_at)}</p>
                      </div>
                    </Link>
                    <span className='reply_floor' >{index + 1}楼</span>
                  </section>
                  <section className='reply_content' dangerouslySetInnerHTML={this.props.createMarkup(content)} ></section>
                  <div className='operation' >
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
                  <section>
                    {
                      this.props.state.current_reply === index &&
                      <ReplyBox placeholder={`@${author.loginname}`} getData={this.props.getData}
                        replySuccess={this.props.replySuccess} loginname={author.loginname}
                        data={{ accessToken: this.props.state.accessToken, topic_id: this.props.state.data.id, reply_id: id }} />
                    }
                  </section>
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

  /**
   * 提交回复
   */
  submit = async () => {
    let data = this.props.data
    let reply_id, content
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
        message.info('回复成功')
        await this.props.getData()
        this.props.replySuccess()
      }
    } else {
      message.info('内容不能为空')
    }
  }

  render () {
    return (
      <div className='reply-box' >
        <textarea className='textarea' ref='content' placeholder={this.props.placeholder} ></textarea>
        <input className='btn' onClick={this.submit} type="button" value='回 复' />
      </div>
    )
  }
}

export default connect(state => ({ userInfo: state.userInfo }))(TopicDetail);