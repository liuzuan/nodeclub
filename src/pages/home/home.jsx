import React, { Component } from 'react';
import PublicHeader from '../../components/header/header';
import TopicList from './components/topicList'
import './home.less'

class Home extends Component {

  state = {
    navItems: [
      { title: '全部', tab: '' },
      { title: '精华', tab: 'good' },
      { title: '分享', tab: 'share' },
      { title: '问答', tab: 'ask' },
      { title: '招聘', tab: 'job' },
      { title: '测试', tab: 'dev' },
    ],
    currentTab: ''
  }

  tabSelect (tab) {
    this.setState({
      currentTab: tab
    })
  }

  render () {
    return (
      <div>
        <PublicHeader title='首页' confirm />
        <section className='home_container'>
          <nav className='home_nav'>
            {
              this.state.navItems.map((item, index) => {
                return <li className={item.tab === this.state.currentTab? 'activeTab':'navList'} onClick={(e) => this.tabSelect(item.tab, e)} key={index}>
                  {item.title}
                </li>
              })
            }
          </nav>
          <TopicList tabs={this.state.navItems} currentTab={this.state.currentTab} />
        </section>

      </div>
    );
  }
}

export default Home;
