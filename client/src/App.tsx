import React from 'react'
import logo from './logo.svg'
import './App.scss'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch as RouteSwitch,
} from 'react-router-dom'

import { QuickRate } from './QuickRate'
import { CssTests } from './CssTests'

const Welcome = () => {
  return <h2>Welcome from React!</h2>
}
const NotWelcome = () => {
  return <h2>Not on welcome page!</h2>
}

const App = (props: {}) => {
  return (
    <div className="App">
      <h2>This is a test of React with Typescript / CSS Modules / SASS</h2>
      Ok hot reloading is working
      <RouteSwitch>
        <Route exact path="/welcome_screen" component={Welcome} />
        <Route exact path="/quick_rates" component={QuickRate} />
        <Route exact path="/css" component={CssTests} />
        <Route component={NotWelcome} />
      </RouteSwitch>
    </div>
  )
}

export default App
