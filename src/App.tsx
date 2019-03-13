import React from 'react';
import logo from './logo.svg';
import './App.scss';

import {Button} from './components/Button'
import {Button2} from './components/Button2'

import { BrowserRouter as Router, Route, Link, Switch as RouteSwitch, BrowserRouter } from "react-router-dom";

const Welcome = () => {
  return (
    <h2>Welcome from React!</h2>
  )
}
const NotWelcome = () => {
  return (
    <h2>Not on welcome page!</h2>
  )
}

const App = (props: {}) => {

  return (
    <div className="App">

      <BrowserRouter>
        <RouteSwitch>
          <Route exact path="/welcome_screen" component={Welcome} />
          <Route component={NotWelcome} />
        </RouteSwitch>
      </BrowserRouter>

  

      <h2>
        This is a test of React with Typescript / CSS Modules / SASS
      </h2>
    
      <Button title='button 1' />
      <Button title='another button' />
      <Button2 title='differently styled button' />
    </div>
  )

}

export default App;
