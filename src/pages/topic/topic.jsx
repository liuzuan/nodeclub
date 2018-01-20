import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetTopic, collect, deCollect } from '../../config/utils/getData';
import PublicHeader from '../../components/header/header';
import './topic.less';

class TopicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',//主题详情数据
      accessToken: this.props.accessToken || '',
    };
    this.getData = async () => { //获取主题详情数据
      let Data = await GetTopic(this.props.match.params.id, this.state.accessToken)
      // console.log(Data)
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
      if (!this.state.data.is_collect) {
        let res = await collect(this.state.accessToken, this.state.data.id)
        if (res.success) {
          await this.getData()
        }
      } else {
        let res = await deCollect(this.state.accessToken, this.state.data.id)
        if (res.success) {
          await this.getData()
        }
      }
    };
  }


  async componentWillMount (state) {
    await this.getData()
    console.log(this.state.data)
  }



  render () {
    var { title, author, replies, is_collect, content } = this.state.data
    return (
      <div>
        <PublicHeader back history={this.props.history} title='主&nbsp;题' />
        <section className='topic_content'>
          <div className='author'>
            <img className='author_avatar' src={author && author.avatar_url} alt="" />
            <span className='author_name'>{author && author.loginname}</span>
            <span onClick={this.handleCollect} className={is_collect ? 'isCollect' : 'collect'}>
              <svg className='icon' aria-hidden="true">
                <use xlinkHref='#icon-love'></use>
              </svg>
            </span>
          </div>
          <p className='topic_title'>{title}</p>
          <div className='markdown' dangerouslySetInnerHTML={this.createMarkup(content)} />
        </section>
        <section className='replies_content'>
          {replies && replies.length > 0 &&
            <header className='replies_header'>
              共<span>{replies.length}</span>条回复
            </header>
          }
          {replies && replies.map((item, index) => {
            return <li className='reply_list' key={item.id}>
              <section className='reply_author' >
                <img className='reply_avatar' src={item.author.avatar_url} alt="" />
                <div className='name_time' >
                  <p className='reply_author_name' >{item.author.loginname}</p>
                  <p className='item.create_at'>时间</p>
                </div>
                <span className='reply_floor' >{index + 1}楼</span>
              </section>
              <section className='reply_content' dangerouslySetInnerHTML={this.createMarkup(item.content)} ></section>
              <div className='operation' >
                <span></span>
                <span>{item.ups.length}</span>
                <span></span>
              </div>
            </li>
          })}
        </section>
      </div >
    );
  }
}

export default connect(state => ({ accessToken: state.userInfo.accessToken }))(TopicDetail);