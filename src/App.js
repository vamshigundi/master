import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as Logo } from './assets/app-icon.svg';
import './App.css';

import Content from './Content';
class App extends Component {
  render() {
    return (
      <div className="App" >
        <div className="header" style={{height: '40px',width: '100%',position: 'fixed', top: '0', backgroundColor: '#fff'}}>
          <Logo />
          </div>

          <div style={{padding: "30px 100px", marginTop: '30px'}}>
            <h4>Tradeshift Global Search</h4>
            <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
        <Content />
        </div>
      </div>
    );
  }
}

export default App;
