import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PublicHeader from '../../components/header/header';
import PublicFooter from '../../components/footer/footer';
import TopicList from './components/topicList';
import './home.less';

class Home extends Component {

  state = {
    navItems: [
      { title: '全部', tab: 'all' },
      { title: '精华', tab: 'good' },
      { title: '分享', tab: 'share' },
      { title: '问答', tab: 'ask' },
      { title: '招聘', tab: 'job' },
      { title: '测试', tab: 'dev' },
    ],
    currentTab: 'all'
  }

  componentWillReceiveProps (nextProps) {
    let tab
    if (nextProps.location.state) {
      tab = nextProps.location.state.tab
    } else {
      tab = 'all'
    }
    this.setState({
      currentTab: tab
    })
  }

  componentWillMount () {
    if (Boolean(this.props.location.state)) {
      this.setState({
        currentTab: this.props.location.state.tab
      })
    }
  }



  tabSelect (tab) {
    this.setState({
      currentTab: tab
    })
  }

  render () {
    return (
      <div>
        <PublicHeader title='首&ensp;页' confirm />
        <section className='home_container'>
          <nav className='home_nav'>
            {
              this.state.navItems.map((item, index) => {
                return <Link to={{ pathname: '/', search: `?tab=${item.tab}`, state: { tab: item.tab } }}
                  className={item.tab === this.state.currentTab ? 'activeTab' : 'navList'}
                  onClick={(e) => this.tabSelect(item.tab, e)} key={index}>
                  {item.title}
                </Link>
              })
            }
          </nav>
          <TopicList currentTab={this.state.currentTab} tabs={this.state.navItems} />
        </section>
        <PublicFooter />
      </div>
    );
  }
}

export default Home;
