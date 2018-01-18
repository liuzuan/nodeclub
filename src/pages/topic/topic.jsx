import React, { Component } from 'react';
import './topic.less';
import { GetTopic } from '../../config/utils/getData';
import PublicHeader from '../../components/header/header';

class TopicDetail extends Component {

  state = {
    data: '',
    replies: [],
    author_name: '',
    author_avatar_url: '',
  }

  async componentWillMount (state) {
    let Data = await GetTopic(this.props.match.params.id)
    this.setState({
      data: Data,//所有数据
      replies: Data.replies,//回复数据
      author_name: Data.author.loginname,//作者昵称
      author_avatar_url: Data.author.avatar_url,//作者头像
    })
    console.log(this.state.replies[0])
    // console.log(this.props)
  }

  createMarkup (html) {
    return {
      __html: html
    }
  }

  render () {
    return (
      <div>
        <PublicHeader back history={this.props.history} title='主&nbsp;题' />
        <section className='topic_content'>
          <div className='author'>
            <img className='author_avatar' src={this.state.author_avatar_url} alt="" />
            <span className='author_name'>{this.state.author_name}</span>
            <span className='zuozhe'>#作者</span>
          </div>
          <p className='topic_title'>{this.state.data.title}</p>
          <div className='markdown' dangerouslySetInnerHTML={this.createMarkup(this.state.data.content)} />
        </section>
        <section className='replies_content'>
          {this.state.replies.length > 0 &&
            <header className='replies_header'>
              共<span>{this.state.replies.length}</span>条回复
            </header>
          }
          {
            this.state.replies.map((item, index) => {
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
              </li>
            })
          }
        </section>
      </div>
    );
  }
}

export default TopicDetail;