import React, { Component } from 'react';
import './topic.less';
import { GetTopic } from '../../config/utils/getData'

class TopicDetail extends Component {

  state = {
    data: '',
  }

  async componentWillMount () {
    this.setState({
      data: await GetTopic(this.props.match.params.id)
    })
    console.log(this.state.data)
    console.log(this.props)
  }

  createMarkup (html) {
    return {
      __html: html
    }
  }

  render () {
    const data = this.state.data
    return (
      <div>
        <section>
          <div>
            {/* <img src={data.author.avatar_url} alt=""/> */}
            <span>#作者</span>
          </div>
          <p className='topic_title'>{data.title}</p>
          <div dangerouslySetInnerHTML={this.createMarkup(data.content)} />
        </section>
      </div>
    );
  }
}

export default TopicDetail;