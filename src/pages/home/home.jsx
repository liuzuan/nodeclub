import React, { Component } from 'react';
import PublicHeader from '../../components/header/header';

class Home extends Component {

  render () {
    return (
      <div className="App">
        <PublicHeader title='首页' confirm />
      </div>
    );
  }
}

export default Home;
