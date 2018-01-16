import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './topicList.less'
import { HomeData } from '../../../config/utils/getData'

class TopicList extends Component {

  state = {
    topicData: [],
    aaa: 123,
    tabs: this.props.tabs,
    currentTab: this.props.currentTab,
  }
  async componentWillMount () {
    this.setState({
      topicData: await HomeData(1, '', 20)
    })
    // console.log(this.state.topicData)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !Object.is(this.props, nextProps) || !Object.is(this.state, nextState)
  }

  async componentWillReceiveProps (nextProps) {
    if (this.props.currentTab !== nextProps.currentTab) {
      this.setState({
        topicData: await HomeData(1, nextProps.currentTab, 20)
      })
    }
  }

  formatTab (tab) {
    for (let k of this.state.tabs) {
      if (k['tab'] === tab) {
        return k['title']
      }
    }
  }

  render () {
    return (
      <section className='topic_lists'>
        
        {
          this.state.topicData.map((item, index) => {
            return <li className='topic_cell' key={item.id}>
              <Link to={`/topic/${item.id}`}>
              {/* <Link to={{ pathname: `/topic/${item.id}`, query: {a: 123}, state: {b: 456} }}> */}
                <section className='author'>
                  <img className='topic_cell_avatar' src={item.author.avatar_url} alt="" />
                  <div className='name_time'>
                    <p className='author_name'>{item.author.loginname}</p>
                    <p className='time'>1天前</p>
                  </div>
                  <div className={item.top ? 'isTop' : item.good ? 'isGood' : 'topic_type'}>
                    {item.top ? '置顶' : item.good ? '精华' : this.formatTab(item.tab)}
                  </div>
                </section>
                <p className='topic_title'>{item.title}</p>
                <section className='topic_amount'>
                  <span className='topic_reply_count'>
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref='#icon-code'></use>
                    </svg>
                    {item.reply_count}
                  </span>
                  <span className='topic_visit_count'>
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref='#icon-browse'></use>
                    </svg>{item.visit_count}
                  </span>
                  <span className='topic_create_at'>
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref='#icon-clock'></use>
                    </svg>一年前
                  </span>
                </section>
              </Link>
            </li>
          })
        }
      </section>
    )
  }
}

export default TopicList