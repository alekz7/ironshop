import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu'
import Product from './components/Product'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <Product />
      </div>
    );
  }
}

export default App;
