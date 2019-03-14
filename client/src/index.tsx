import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as pymUtil from './util/pym'
pymUtil.install()

import { BrowserRouter } from 'react-router-dom'

declare var module: any

const render = Component => {
  return ReactDOM.render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(NextApp)
  })
}

// import { RawOrdersPage } from 'meteor/swanleap:microservice-raworders';

// declare var Package: any

// function tryInjectRawOrders() {
//   if(Package && Package["swanleap:microservice-raworders"]) {
//     import('meteor/swanleap:microservice-raworders').then( RawOrdersPage => {
//       let rootElement = document.getElementById('react-root-raw-orders')
//       ReactDOM.render(<RawOrdersPage />, rootElement);
//     })
//   }
// }
// tryInjectRawOrders()

// let isReactInjected = false

// const tryInject = () => {
//   if(isReactInjected) { return }

//   console.log('checking for react')
//   let rootElement = document.getElementById('react-root') || document.getElementById('root')
//   if(rootElement) {
//     console.log('injecting react')
//     console.log('root element is', rootElement)

//       ReactDOM.render(<App />, rootElement);

//     isReactInjected = true
//   }
// }

// tryInject()
// const intevalTimerId = setInterval(() => {
//     tryInject()
// }, 250)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
