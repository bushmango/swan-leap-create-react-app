import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

import {Button} from './components/Button'
import {Button2} from './components/Button2'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>
          This is a test of React with Typescript / CSS Modules / SASS
        </h2>
      
        <Button title='button 1' />
        <Button title='another button' />
        <Button2 title='differently styled button' />
      </div>
    );
  }
}

export default App;
