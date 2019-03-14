import * as _ from 'lodash'

const log = (...args) => {
  console.log('iFrame>>', ...args)
}
const logError = (...args) => {
  console.error('iFrame>>', 'ERROR', ...args)
}

const callGlobalWithCallback = (
  functionName: string,
  args: any[],
  callback: (er: any, result: any) => void
) => {
  if (!window.parent) {
    log('not in an iframe, RPC failed')
    return
  }

  currentToken += 1

  rpcCallbackList.push({
    started: new Date(),
    token: currentToken,
    callback,
  })
  log('calling', functionName, currentToken)
  log({
    type: 'call-global',
    token: currentToken,
    functionName: functionName,
    args: args,
  })
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
  log('got window message')
  // log(ev.data)
  // if (ev.origin !== 'http://localhost:4100') {
  //   console.error('invalid origin', ev.origin)
  //   return
  // }

  if (ev.data.type === 'call-global-response') {
    let { token, result, err } = ev.data

    let callbackEntry = _.find(rpcCallbackList, c => c.token === token)
    if (!callbackEntry) {
      logError('No callback registered for ' + token)
      return
    }
    _.remove(rpcCallbackList, c => c.token === token)
    const timeToExecute = new Date().getTime() - callbackEntry.started.getTime()
    log(`call executed in ${timeToExecute} ms`)
    if (err) {
      logError(err)
    }
    callbackEntry.callback(err, result)
  } else {
    log('ignored iframe message')
  }
}

let currentToken = 100000
interface IRpcCallback {
  started: Date
  token: number
  callback: (err: any, result: any) => void
}
let rpcCallbackList: IRpcCallback[] = []

export function callGlobal<T>(functionName: string, ...args): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    callGlobalWithCallback(functionName, args, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
