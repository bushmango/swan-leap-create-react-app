import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

import {Button} from './components/Button'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>
          This is a test of React with Typescript / CSS Modules / SASS
        </h2>
      
        <Button title='button 1' />
        <Button title='another button' />
      </div>
    );
  }
}

export default App;
