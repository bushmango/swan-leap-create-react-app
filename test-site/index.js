if (typeof window.global === 'undefined') {
  window.global = {}
}

function log (...args) {
  console.log('parent<<', ...args)
}
function logError (...args) {
  console.error('parent<<', 'ERROR', ...args)
}

global.getXkcdRandomNumber = (numberToAdd) => {
  let random = 4 // Guaranteed random by dice roll
  return random + numberToAdd
}
global.getActualRandomNumber = (max) => {
  let random = Math.floor(Math.random() * max) + 1
  return random
}

function init () {
  document.getElementById('targetDiceRoll').innerText =
    '' + global.getActualRandomNumber(10) + '|' + global.getXkcdRandomNumber(0)
}
init()

window.onmessage = (ev) => {
  log('got an iframe message')
  // log(ev.data)

  // if (ev.origin !== 'http://localhost:4101') {
  //   console.error('invalid origin', ev.origin)
  //   return
  // }

  if (ev.data.type === 'call-global') {
    let functionName = ev.data.functionName
    let token = ev.data.token
    let args = ev.data.args
    let func = window.global[functionName]

    log(functionName, token, 'starting')

    let caughtException = null
    let result = null
    if (!func) {
      caughtException = 'No global function named ' + functionName
      logError(caughtException)
    }
    if (!caughtException) {
      try {
        result = func(...args)
      } catch (err) {
        caughtException = err
        logError(caughtException)
      }
    }
    log(functionName, token, 'complete')
    ev.source.postMessage(
      {
        type: 'call-global-response',
        token: token,
        err: caughtException,
        result: result
      },
      '*'
    )
  } else {
    log('ignored iframe message')
  }
}
