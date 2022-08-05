import React, { Component } from 'react';
import './App.css';
import { getCategories } from './services/api';

class App extends Component {
  render() {
    getCategories();
    console.log(getCategories());
    return (
      <div>
        <p> alo</p>
      </div>
    );
  }
}

export default App;
