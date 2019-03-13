import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';


let isReactInjected = false

const tryInject = () => {
  if(isReactInjected) { return }
  console.log('checking for react')
  let rootElement = document.getElementById('react-root') || document.getElementById('root')
  if(rootElement) {
    console.log('injecting react')
    console.log('root element is', rootElement)   
    ReactDOM.render(<App />, rootElement);   
    isReactInjected = true
  }
}


tryInject()
const intevalTimerId = setInterval(() => {
    tryInject()  
}, 250)



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
