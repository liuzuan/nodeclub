import React, { Component } from 'react'
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
      topicData: await HomeData(1, '', 50)
    })
    console.log(this.state.topicData)
  }

  shouldComponentUpdate (nextPropS, nextState) {
    console.log(!Object.is(this.props, nextPropS) || !Object.is(this.state, nextState))
    return !Object.is(this.props, nextPropS) || !Object.is(this.state, nextState)
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
            return <li className='topic_cell' key={index}>
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
              <section>
                <span></span>
                <span></span>
                <span></span>
              </section>
            </li>
          })
        }
      </section>
    )
  }
}

export default TopicList