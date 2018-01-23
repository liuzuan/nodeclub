import React, { Component } from 'react';
import PublicHeader from '../../common/header/header';
import PublicFooter from '../../common/footer/footer';
import './create.less';
import { connect } from 'react-redux';
import { createTopic } from '../../config/utils/getData';
import { message } from 'antd';

class Create extends Component {
  constructor(props) {
    super(props);
    this.submit = async () => {
      let accesstoken = this.props.accessToken
      let title = this.refs.title.value
      let tab = this.refs.tab.value
      let content = this.refs.content.value
      if (title.length < 10) {
        message.info('标题字数不足')
      } else if (!tab) {
        message.info('请选择一种类型')
      } else if (!content) {
        message.info('内容不能为空')
      } else {
        let res = await createTopic(accesstoken, title, tab, content)
        console.log(accesstoken, title, tab, content)
        if (res.success) {
          message.info('发表成功')
        } else {
          message.info('发表失败')
        }
      }
    }
  }

  componentWillMount(){
    if (!this.props.accessToken) {
      this.props.history.replace('/signin')
    }
  }

  render () {
    return (
      <div>
        <PublicHeader avatar sent title='发&nbsp;表' submit={this.submit} />
        <section className='create-container' >
          <input ref='title' className='title' type="text" placeholder='标题:(10字以上)' />
          <select ref='tab' className='tab'>
            <option value="">请选择一种类型</option>
            <option value="share">分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
            <option value="dev">测试</option>
          </select>
          <textarea ref='content' className='content' placeholder='markdown文本，请注意格式标记' ></textarea>
        </section>
        <PublicFooter path={this.props.match.path} />
      </div>
    )
  }

}

export default connect(state => ({ accessToken: state.userInfo.accessToken }))(Create)