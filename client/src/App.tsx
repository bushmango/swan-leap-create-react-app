import React from 'react'
import logo from './logo.svg'
import './App.scss'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch as RouteSwitch,
} from 'react-router-dom'

import { QuickRate } from './pages/QuickRate'
import { CssTests } from './pages/CssTests'
import { IFrameTest } from './pages/IFrameTest'

const Welcome = () => {
  return <h2>Welcome from React!</h2>
}
const NotWelcome = () => {
  return <h2>Not on welcome page!</h2>
}

const App = (props: {}) => {
  return (
    <div className="App">
      <RouteSwitch>
        <Route exact path="/welcome_screen" component={Welcome} />
        <Route exact path="/quick_rates" component={QuickRate} />
        <Route exact path="/iframe-test" component={IFrameTest} />
        <Route exact path="/css" component={CssTests} />
        <Route component={NotWelcome} />
      </RouteSwitch>

      <div
        style={{
          color: '#ccc',
          fontSize: '14px',
          margin: '1em',
          padding: '1em',
          border: 'solid 1px #ccc',
          borderRadius: '8px',
        }}
      >
        This is a test of React with Typescript / CSS Modules / SASS
      </div>
    </div>
  )
}

export default App
