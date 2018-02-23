import React, { Component } from 'react';
import { NullData, PublicFooter, PublicHeader } from '../../../common/index';
import './message.less';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMsg } from '../../../config/utils/getData';
import { formatDate } from '../../../config/utils/tool';

/**
 * 模块入口
 */
class Message extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      message: [], //所有消息
      showingMsg: [], // 展示中的消息
    };
    this.getMessage = async() => {
      if ( this.props.accessToken ) {
        let res = await getMsg( this.props.accessToken )
        let state = this.props.location.state
        this.setState( { message: res, showingMsg: res[ state ? state.type : 'has_read_messages' ] } )
      }
    };
    this.createMarkup = ( html ) => {
      return {
        __html: html
      }
    }
  }

  async componentWillMount() {
    if ( this.props.location.pathname === '/my/message' ) {
      this.props.history.replace( '/my/message/has_read' )
    }
    if ( this.props.accessToken ) {
      await this.getMessage()
    }
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.location.state !== this.props.location.state ) {
      this.setState( { showingMsg: this.state.message[ nextProps.location.state.type ] } )
    }
  }

  render() {
    if ( !this.props.accessToken ) {
      return <Redirect to={{ pathname: '/signin', state: { from: this.props.location }}} />
    }
    return (
      <div className='message' >
        <PublicHeader avatar title='个人消息'></PublicHeader>
        <nav>
          <NavLink to={{ pathname: '/my/message/has_read', state: { type: 'has_read_messages' } }} activeClassName='activeTab' >
            <p>已读消息</p>
          </NavLink>
          <NavLink to={{ pathname: '/my/message/hasnot_read', state: { type: 'hasnot_read_messages' } }} activeClassName='activeTab' >
            <p>未读消息</p>
          </NavLink>
        </nav>
        <section className='message-content'>
          {
            !this.state.showingMsg.length ?
              <div className='nomsg' >
                <NullData />
              </div>
              :
              <div className='message-list'>
                {this.state.showingMsg.map((item, index) => {
                  var { author, create_at, reply, topic, type } = item
                  return <li className='list-cell' key={item.id} >
                    <Link to={`/user/${author.loginname}`}>
                      <img src={author.avatar_url} alt="" />
                    </Link>
                    <div>
                      <p className='name-time' >
                        <Link to={`/user/${author.loginname}`}>
                          <span className='name' >{author.loginname}</span>
                        </Link>
                        <span className='time' >{formatDate(create_at)}</span>
                      </p>
                      <Link to={`/topic/${topic.id}`} >
                        <p className='type' >在话题{topic.title}中{type === 'reply' ? '回复' : '@'}了你</p>
                      </Link>
                    </div>
                    <Link to={`/topic/${topic.id}`} className='message-text' >
                      <p dangerouslySetInnerHTML={this.createMarkup(reply.content)}></p>
                    </Link>
                  </li>
                })}
              </div>
          }
        </section>
        <PublicFooter />
      </div>
    )
  }
}

export default connect( state => ( {
  accessToken: state.userInfo.accessToken
} ) )( Message )