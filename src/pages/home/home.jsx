import React, { Component } from 'react';
import './home.less';
import { saveHomeState } from '@/store/action.js';
import { formatDate } from '@/config/utils/tool';
import { DataLoading, PublicHeader, PublicFooter } from '@/common/index';
import InfiniteScroll from 'react-infinite-scroller';
import { HomeData } from '@/config/utils/getData';
import { connect } from 'react-redux';
import { ToTop } from '@/common/index';
import { Link } from 'react-router-dom';

/**
 * 首页模块入口
 */
class Home extends Component {
    state = {
        navItems: [
            { title: '全部', tab: 'all' },
            { title: '精华', tab: 'good' },
            { title: '分享', tab: 'share' },
            { title: '问答', tab: 'ask' },
            { title: '招聘', tab: 'job' },
            { title: '测试', tab: 'dev' }
        ],
        currentTab: 'all', //当前分类
        nav_bottom: '0',
        topicListsLeft: '0'
    };

    /**
     * 设置导航下底线
     */
    setNavBottom = tab => {
        let nav_bottom, topicListsLeft;
        switch (tab) {
            case 'all':
                nav_bottom = '0';
                topicListsLeft = '0';
                break;
            case 'good':
                nav_bottom = '16.6%';
                topicListsLeft = '-16.6%';
                break;
            case 'share':
                nav_bottom = '33.4%';
                topicListsLeft = '-33.4%';
                break;
            case 'ask':
                nav_bottom = '50%';
                topicListsLeft = '-50%';
                break;
            case 'job':
                nav_bottom = '66.7%';
                topicListsLeft = '-66.7%';
                break;
            case 'dev':
                nav_bottom = '83.3%';
                topicListsLeft = '-83.3%';
                break;
            default:
                nav_bottom = '0';
                topicListsLeft = '0';
        }
        this.setState({
            nav_bottom: nav_bottom,
            topicListsLeft: topicListsLeft
        });
    };

    /**
     * 点击导航切换话题分类
     */
    tabSelect = tab => {
        this.setNavBottom(tab);
        this.setState({
            currentTab: tab
        });
    };

    // home数据，Unmount前使用
    homeState = () => {
        let payload = {
            tab: 'home',
            data: this.state
        };
        return payload;
    };

    async componentWillMount() {
        if (this.props.state.home) {
            // 进入首页，store有对应tab数据则渲染
            let data = this.props.state.home.data;
            this.setNavBottom(data.currentTab);
            this.setState({
                currentTab: data.currentTab
            });
            this.props.history.replace(`/?tab=${data.currentTab}`);
        } else {
            let tab;
            if (this.props.location.search) {
                tab = this.props.location.search.slice(this.props.location.search.indexOf('=') + 1);
            } else {
                tab = 'all';
            }
            this.setState({
                currentTab: tab
            });
            this.setNavBottom(tab);
        }
    }

    /**
     * 前进后退获取数据
     */
    async componentWillReceiveProps(nextProps) {
        let tab;
        if (nextProps.location.search) {
            tab = nextProps.location.search.slice(nextProps.location.search.indexOf('=') + 1);
        } else {
            tab = 'all';
        }
        this.setState({ currentTab: tab });
        this.setNavBottom(tab);
    }

    /**
     * 离开页面获取滚动条位置并保存到store
     */
    componentWillUnmount() {
        this.props.saveHomeState(this.homeState());
    }

    render() {
        return (
            <div id="home">
                <PublicHeader title="首&nbsp;页" avatar />
                <Nav state={this.state} tabSelect={this.tabSelect} />
                <Lists _this={this} />
                <PublicFooter />
                <ToTop />
            </div>
        );
    }
}

/**
 * 首页导航标签
 */
class Nav extends Component {
    render() {
        let { navItems, currentTab, nav_bottom } = this.props.state;
        return (
            <nav className="homeNav">
                <section className="navList">
                    {navItems.map(item => {
                        return (
                            <Link
                                to={{ pathname: '/', search: `?tab=${item.tab}` }}
                                className={item.tab === currentTab ? 'activeTab' : 'navItem'}
                                onClick={e => this.props.tabSelect(item.tab, e)}
                                key={item.tab}>
                                {item.title}
                            </Link>
                        );
                    })}
                </section>
                <div className="nav-bottom" style={{ left: nav_bottom }} />
            </nav>
        );
    }
}

/**
 * 所有列表
 */
class Lists extends Component {
    render() {
        let state = this.props._this.state;
        let saveHomeState = this.props._this.props.saveHomeState;
        let offset = { transform: `translateX(${state.topicListsLeft})` };
        return (
            <main className="lists" style={offset}>
                <TopicList tab="all" state={state} saveHomeState={saveHomeState} />
                <TopicList tab="good" state={state} saveHomeState={saveHomeState} />
                <TopicList tab="share" state={state} saveHomeState={saveHomeState} />
                <TopicList tab="ask" state={state} saveHomeState={saveHomeState} />
                <TopicList tab="job" state={state} saveHomeState={saveHomeState} />
                <TopicList tab="dev" state={state} saveHomeState={saveHomeState} />
            </main>
        );
    }
}

/**
 * 单个列表
 */
class TopicList extends Component {
    state = {
        navItems: this.props.state.navItems,
        topicData: [], // 列表数据
        page: 1, // 当前已加载页数
        hasMore: true // 有无更多数据
    };

    formatTab = tab => {
        for (let k of this.state.navItems) {
            if (k['tab'] === tab) {
                return k['title'];
            }
        }
    };

    saveState = () => {
        let payload = {
            tab: this.props.tab,
            data: this.state,
            scrollBar: ''
        };
        return payload;
    };

    /**
     * 上拉加载
     */
    scrollGetData = async () => {
        let newPage = this.state.page + 1;
        let res = await HomeData(newPage, this.props.tab, 10);
        let newTopicData = [...this.state.topicData, ...res];
        this.setState({
            page: newPage,
            topicData: newTopicData,
            hasMore: !res.length < 10
        });
    };

    async componentWillMount() {
        this.setState({
            topicData: await HomeData(1, this.props.tab, 10)
        });
    }

    componentWillUnmount() {
        this.props.saveHomeState(this.saveState());
        // console.log(this.props.saveHomeState)
    }

    render() {
        let { hasMore, topicData } = this.state;
        return (
            <div className="listPanel">
                <InfiniteScroll
                    loadMore={this.scrollGetData}
                    hasMore={hasMore}
                    initialLoad={false}
                    useWindow={false}
                    threshold={100}>
                    <section className="topic_lists">
                        {Boolean(topicData.length) &&
                            topicData.map((item, index) => {
                                return (
                                    <li className="topic_cell" key={item.id}>
                                        <Link to={`/topic/${item.id}`}>
                                            <section className="author">
                                                <img
                                                    className="topic_cell_avatar"
                                                    src={item.author.avatar_url}
                                                    alt=""
                                                />
                                                <div className="name_time">
                                                    <p className="author_name">{item.author.loginname}</p>
                                                    <p className="time">{formatDate(item.create_at)}</p>
                                                </div>
                                                {item.tab && (
                                                    <div
                                                        className={
                                                            item.top ? 'isTop' : item.good ? 'isGood' : 'topic_type'
                                                        }>
                                                        {item.top
                                                            ? '置顶'
                                                            : item.good
                                                                ? '精华'
                                                                : this.formatTab(item.tab)}
                                                    </div>
                                                )}
                                            </section>
                                            <p className="topic_title">{item.title}</p>
                                            <section className="topic_amount">
                                                <span className="topic_reply_count">
                                                    <svg className="icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-changyonghuifu" />
                                                    </svg>
                                                    {item.reply_count}
                                                </span>
                                                <span className="topic_visit_count">
                                                    <svg className="icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-yanjing" />
                                                    </svg>
                                                    {item.visit_count}
                                                </span>
                                                <span className="topic_create_at">
                                                    <svg className="icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-time" />
                                                    </svg>
                                                    {formatDate(item.last_reply_at)}
                                                </span>
                                            </section>
                                        </Link>
                                    </li>
                                );
                            })}
                        <div className="hasMore">{hasMore ? <DataLoading /> : '已无更多...'}</div>
                    </section>
                </InfiniteScroll>
            </div>
        );
    }
}

export default connect(
    state => ({
        state: state.home
    }),
    {
        saveHomeState
    }
)(Home);
