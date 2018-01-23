import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PublicHeader from '../../common/header/header';
import PublicFooter from '../../common/footer/footer';
import './home.less';
import { ToTop } from '../../common/index';
import { formatDate } from '../../config/utils/filter';
import { HomeData } from '../../config/utils/getData';
import { DataLoading } from '../../common/index';

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
      currentTab: 'all',
      topicData: [],
    };

    /** 
     * tab分类选择
    */
    this.tabSelect = (tab) => {
      this.setState({
        currentTab: tab,
        topicData: HomeData(1, tab, 20)
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
    }
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
      topicData: await HomeData(1, tab, 20)
    })
  }
  /** 
   * 挂载前获取首页数据
  */
  async componentWillMount () {
    if (Boolean(this.props.location.state)) {
      this.setState({
        currentTab: this.props.location.state.tab
      })
    }
    this.setState({
      topicData: await HomeData(1, this.state.currentTab, 20)
    })
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
            currentTab={this.state.currentTab} formatTab={this.formatTab}
            data={this.state.topicData} tabs={this.state.navItems} />
        </section>
        <PublicFooter path={this.props.match.path} />
        <ToTop />
      </div>
    );
  }
}

/**
 * 
 * 
 * 首页列表
 * 
 */
class TopicList extends Component {
  state = {}
  render () {
    return (
      <div>
        <section className='topic_lists'>
          {this.props.data.length ?
            this.props.data.map((item, index) => {
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
            }):
            <div className='loading' ><DataLoading /></div>
          }
        </section>
      </div>
    )
  }
}

export default Home;
