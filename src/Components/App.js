import React, { Component } from 'react';

import Game from "./Game";

import '../assets/App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Game/>
      </div>
    );
  }
}

export default App;
