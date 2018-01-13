import React, { Component } from 'react';
import PublicHeader from '../../components/header/header';
import './home.less'
import { HomeData } from '../../config/utils/getData'

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
    topicData: [],
  }

  async componentDidMount () {
    this.setState({
      topicData: await HomeData(1, 'good', 20)
    })
    console.log(this.state.topicData)
  }

  render () {
    return (
      <div>
        <PublicHeader title='首页' confirm />
        <section className='home_container'>
          <nav className='home_nav'>
            {
              this.state.navItems.map((item, index) => {
                return <li className='navList' key={index}>
                  {item.title}
                </li>
              })
            }
          </nav>
          <section className='topic_lists'>
            <li>
              {
                this.state.topicData.map((item, index) => {
                  return <div>123456</div>
                })
              }
            </li>
          </section>
        </section>
      </div>
    );
  }
}

export default Home;
