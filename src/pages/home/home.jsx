import React, { Component } from 'react';
import './home.less';
import { saveHomeState } from '../../store/action.js';
import { formatDate, scrollBar } from '../../config/utils/tool';
import { DataLoading, PublicHeader, PublicFooter } from '../../common/index';
import InfiniteScroll from 'react-infinite-scroller';
import { HomeData } from '../../config/utils/getData';
import { connect } from 'react-redux';
import { ToTop } from '../../common/index';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * 首页模块入口
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        { title: '全部', tab: 'all' },
        { title: '精华', tab: 'good' },
        { title: '分享', tab: 'share' },
        { title: '问答', tab: 'ask' },
        { title: '招聘', tab: 'job' },
        { title: '测试', tab: 'dev' },
      ],
      currentTab: 'all', //当前分类
      topicData: [], // 列表数据
      page: 1, // 当前已加载页数
      hasMore: true, // 有无更多数据
      nav_bottom: '0',
    };

    /**
     * 上拉加载
     */
    this.scrollGetData = async () => {
      let newPage = this.state.page + 1
      let res = await HomeData(newPage, this.state.currentTab, 10)
      let newTopicData = [...this.state.topicData, ...res]
      this.setState({
        page: newPage,
        topicData: newTopicData,
        hasMore: !res.length < 10
      })
    }

    /**
     * 设置导航下底线
     */
    this.setNavBottom = (tab) => {
      let nav_bottom
      switch (tab) {
        case 'all':
          nav_bottom = '0';
          break;
        case 'good':
          nav_bottom = '16.6%';
          break;
        case 'share':
          nav_bottom = '33.4%';
          break;
        case 'ask':
          nav_bottom = '50%';
          break;
        case 'job':
          nav_bottom = '66.7%';
          break;
        case 'dev':
          nav_bottom = '83.3%';
          break;
        default:
          nav_bottom = '0';
      }
      this.setState({
        nav_bottom: nav_bottom
      })
    }

    /**
     * 点击导航选择话题分类
     */
    this.tabSelect = (tab) => {
      this.setNavBottom(tab)
      this.setState({
        currentTab: tab,
        topicData: HomeData(1, tab, 10)
      })
      // 切换tab前保存数据到store
      this.props.saveHomeState(this.tabState())
    };

    /**
     * 列表项tab过滤(good => 精华)
     */
    this.formatTab = (tab) => {
      for (let k of this.state.navItems) {
        if (k['tab'] === tab) {
          return k['title']
        }
      }
    };

    // tab数据，切换tab前使用
    this.tabState = () => {
      let payload = {
        tab: this.state.currentTab,
        data: this.state,
        scrollBar: scrollBar()
      }
      return payload
    }
    // home数据，Unmount前使用
    this.homeState = () => {
      let payload = {
        tab: 'home',
        data: this.state,
        scrollBar: scrollBar()
      }
      return payload
    }
  }

  async componentWillMount () {
    if (this.props.state.home) { // 进入首页，store有对应tab数据则渲染
      let data = this.props.state.home.data
      let scrollBar = this.props.state.home.scrollBar
      let left = scrollBar.left
      let top = scrollBar.top
      this.setNavBottom(data.currentTab)
      this.setState({
        currentTab: data.currentTab,
        topicData: data.topicData,
        page: data.page,
        hasMore: data.hasMore,
      })
      setTimeout(() => {
        window.scrollTo(left, top)
      }, 20)
    } else { // 无数据则发送请求获取数据
      this.setState({
        topicData: await HomeData(1, this.state.currentTab, 10)
      })
    }
    if (Boolean(this.props.location.search)) { // 设置导航
      let tab = this.props.location.search.split('=')[1]
      this.setNavBottom(tab)
      this.setState({
        currentTab: tab
      })
    }
  }
  /**
   * 前进后退获取数据
   */
  async componentWillReceiveProps (nextProps) {
    // console.log(nextProps)
    let tab
    if (nextProps.location.search) {
      tab = nextProps.location.search.slice(nextProps.location.search.indexOf('=') + 1)
    } else {
      tab = 'all'
    }
    if (this.props.state[tab]) {
      let data = this.props.state[tab].data
      let scrollBar = this.props.state[tab].scrollBar
      this.setState({
        currentTab: tab,
        page: data.page,
        hasMore: data.hasMore,
        topicData: data.topicData
      })
      setTimeout(() => {
        window.scrollTo(scrollBar.left, scrollBar.top)
      }, 20)
    } else {
      this.setState({
        currentTab: tab,
        topicData: await HomeData(1, tab, 10),
      })
    }
  }

  /**
   * 离开页面获取滚动条位置和本页数据并保存到store
   */
  componentWillUnmount () {
    this.props.saveHomeState(this.homeState())
  }

  render () {
    return (
      <div>
        <PublicHeader title='首&nbsp;页' avatar />
        <main className='home_container'>
          <nav className='home_nav'>
            <section className='navList' >
              {
                this.state.navItems.map(item => {
                  return <Link to={{ pathname: '/', search: `?tab=${item.tab}` }}
                    className={item.tab === this.state.currentTab ? 'activeTab' : 'navItem'}
                    onClick={e => this.tabSelect(item.tab, e)} key={item.tab}>
                    {item.title}
                  </Link>
                })
              }
            </section>
            <div className='nav-bottom' style={{ left: this.state.nav_bottom }} ></div>
          </nav>
          <ReactCSSTransitionGroup
            transitionName="slide-in"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            <TopicList
              // key={this.props.location.search}
              state={this.state}
              currentTab={this.state.currentTab} formatTab={this.formatTab}
              scrollGetData={this.scrollGetData} />
          </ReactCSSTransitionGroup>
        </main>
        <PublicFooter />
        <ToTop />
      </div>
    )
  }
}

/**
 * class TopicList
 * 首页列表
 */
class TopicList extends Component {
  render () {
    let { hasMore, topicData } = this.props.state
    return (
      <InfiniteScroll
        loadMore={this.props.scrollGetData}
        hasMore={hasMore}
        initialLoad={false}
        threshold={100}>
        <section className='topic_lists'>
          {Boolean(topicData.length) &&
            topicData.map((item, index) => {
              return <li className='topic_cell' key={item.id}>
                <Link to={`/topic/${item.id}`}>
                  <section className='author'>
                    <img className='topic_cell_avatar' src={item.author.avatar_url} alt="" />
                    <div className='name_time'>
                      <p className='author_name'>{item.author.loginname}</p>
                      <p className='time'>{formatDate(item.create_at)}</p>
                    </div>
                    {
                      item.tab &&
                      <div className={item.top ? 'isTop' : item.good ? 'isGood' : 'topic_type'}>
                        {item.top ? '置顶' : item.good ? '精华' : this.props.formatTab(item.tab)}
                      </div>
                    }
                  </section>
                  <p className='topic_title'>{item.title}</p>
                  <section className='topic_amount'>
                    <span className='topic_reply_count'>
                      <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-changyonghuifu'></use>
                      </svg>
                      {item.reply_count}
                    </span>
                    <span className='topic_visit_count'>
                      <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-yanjing'></use>
                      </svg>{item.visit_count}
                    </span>
                    <span className='topic_create_at'>
                      <svg className="icon" aria-hidden="true">
                        <use xlinkHref='#icon-time'></use>
                      </svg>{formatDate(item.last_reply_at)}
                    </span>
                  </section>
                </Link>
              </li>
            })
          }
          <div className='hasMore' >{hasMore ? <DataLoading /> : '已无更多...'}</div>
        </section>
      </InfiniteScroll>
    )
  }
}

export default connect(state => ({
  state: state.home,
  scrollBar: state.home.scrollBar,
}), {
    saveHomeState
  })(Home);