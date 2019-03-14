import React from 'react'

import { Button } from '../components/Button'
import { ButtonAlt } from '../components/ButtonAlt'

import * as _ from 'lodash'

const RPC = (
  functionName: string,
  args: any[],
  callback: (response: any) => void
) => {
  if (!window.parent) {
    console.log('not in an iframe, RPC failed')
    return
  }

  currentToken += 1

  rpcCallbackList.push({
    started: new Date(),
    token: currentToken,
    callback,
  })
  console.log('calling', functionName, currentToken)
  window.parent.postMessage(
    {
      type: 'call-global',
      token: currentToken,
      functionName: functionName,
      args: args,
    },
    '*' // TODO: fix target origin
  )
}
window.addEventListener('message', onMessage, false)
function onMessage(ev) {
  console.log('got window message')
  console.log(ev.data)
  // if (ev.origin !== 'http://localhost:4100') {
  //   console.error('invalid origin', ev.origin)
  //   return
  // }

  if (ev.data.type === 'call-global-response') {
    let { token, result } = ev.data

    let callbackEntry = _.find(rpcCallbackList, c => c.token === token)
    if (!callbackEntry) {
      console.error('No callback registered for ' + token)
      return
    }
    _.remove(rpcCallbackList, c => c.token === token)
    const timeToExecute = new Date().getTime() - callbackEntry.started.getTime()
    console.log(`call executed in ${timeToExecute} ms`)
    callbackEntry.callback(result)
  } else {
    console.log('ignored iframe message')
  }
}

let currentToken = 100000
interface IRpcCallback {
  started: Date
  token: number
  callback: (response: any) => void
}
let rpcCallbackList: IRpcCallback[] = []

const IFrameTest = (props: {}) => {
  const onClick = () => {
    RPC('getRandomNumber', [1], result => {
      alert('result was ' + result)
    })
  }

  return (
    <div>
      Iframe test goes here
      <button onClick={onClick}>Do it</button>
    </div>
  )
}

export { IFrameTest }
