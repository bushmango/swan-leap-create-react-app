if (typeof window.global === 'undefined') {
  window.global = {}
}

global.getRandomNumber = (numberToAdd) => {
  let random = 4 // Guaranteed random by dice roll
  return random + numberToAdd
}

function init () {
  document.getElementById('targetDiceRoll').innerText =
    '' + global.getRandomNumber(0)
}
init()

window.onmessage = (ev) => {
  console.log('got an iframe message')
  console.log(ev.data)

  // if (ev.origin !== 'http://localhost:4101') {
  //   console.error('invalid origin', ev.origin)
  //   return
  // }

  if (ev.data.type === 'call-global') {
    let functionName = ev.data.functionName
    let token = ev.data.token
    let args = ev.data.args
    let func = window.global[functionName]

    console.log(functionName, token)

    if (!func) {
      console.error('No global function named ' + functionName)
      return
    }
    let result = func(...args)
    console.log(functionName, token, result)
    ev.source.postMessage(
      {
        type: 'call-global-response',
        token: token,
        result: result
      },
      '*'
    )
  } else {
    console.log('ignored iframe message')
  }
}
