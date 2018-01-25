import React, { Component } from 'react';
import './home.less';
import PublicHeader from '../../common/header/header';
import PublicFooter from '../../common/footer/footer';
import { saveHomeScrollBar, saveHomeState } from '../../store/action.js';
import { formatDate, scrollBar } from '../../config/utils/tool';
import { DataLoading } from '../../common/index';
import InfiniteScroll from 'react-infinite-scroller';
import { HomeData } from '../../config/utils/getData';
import { connect } from 'react-redux';
import { ToTop } from '../../common/index';
import { Link } from 'react-router-dom';

/**
 * 
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
      hasMore: true// 有无更多数据
    };

    /** 
     * 下拉加载
    */
    this.scrollGetData = async () => {
      let newPage = this.state.page + 1
      let res = await HomeData(newPage, this.state.currentTab, 10)
      let newTopicData = [...this.state.topicData, ...res]
      this.setState({ page: newPage, topicData: newTopicData, hasMore: !res.length < 10 })
    }

    /** 
     * tab分类选择
    */
    this.tabSelect = (tab) => {
      this.setState({
        currentTab: tab,
        topicData: HomeData(1, tab, 10)
      })
    };

    /** 
     * 列表项tab过滤
    */
    this.formatTab = (tab) => {
      for (let k of this.state.navItems) {
        if (k['tab'] === tab) {
          return k['title']
        }
      }
    };
  }

  /**
   * 
   * 前进后退获取数据
   */
  async componentWillReceiveProps (nextProps) {
    let tab
    if (nextProps.location.state) {
      tab = nextProps.location.state.tab
    } else {
      tab = 'all'
    }
    this.setState({
      currentTab: tab,
      topicData: await HomeData(1, tab, 10)
    })
  }

  async componentWillMount () {
    if (this.props.state) {//store有数据则渲染
      let state = this.props.state
      let left = this.props.scrollBar.left
      let top = this.props.scrollBar.top
      this.setState({
        currentTab: state.currentTab,
        topicData: state.topicData,
        page: state.page,
        hasMore: state.hasMore,
      })
      setTimeout(() => { window.scrollTo(left, top) }, 20)
    } else { //store无数据则发送请求获取数据
      this.setState({
        topicData: await HomeData(1, this.state.currentTab, 10)
      })
    }
    if (Boolean(this.props.location.state)) {
      this.setState({
        currentTab: this.props.location.state.tab
      })
    }

  }

  /** 
   * 离开页面获取滚动条并记录到store
  */
  componentWillUnmount () {
    this.props.saveHomeScrollBar(scrollBar())
    this.props.saveHomeState(this.state)
  }

  render () {
    return (
      <div>
        <PublicHeader title='首&nbsp;页' avatar />
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
          <TopicList
            state={this.state}
            currentTab={this.state.currentTab} formatTab={this.formatTab}
            scrollGetData={this.scrollGetData} />
        </section>
        <PublicFooter />
        <ToTop />
      </div>
    );
  }
}

/**
 * 
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
                    <div className={item.top ? 'isTop' : item.good ? 'isGood' : 'topic_type'}>
                      {item.top ? '置顶' : item.good ? '精华' : this.props.formatTab(item.tab)}
                    </div>
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
  state: state.home.state,
  scrollBar: state.home.scrollBar,
}), {
    saveHomeScrollBar, saveHomeState
  })(Home);
