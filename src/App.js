import React, { Component } from 'react';
import './App.css';
import PublicHeader from './components/header/header'


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <PublicHeader title='首页' name='刘祖安' confirm />
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
