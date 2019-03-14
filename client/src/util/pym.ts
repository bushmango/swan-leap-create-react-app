import * as pym from 'pym.js'
import PubSub from 'pubsub-js'

let pymChild = null

export function install() {
  if (pymChild) {
    return
  }
  pymChild = new pym.Child({
    renderCallback: () => {
      console.log('resize pym')
      PubSub.publish('pym:resize')
    },
    polling: 250,
  })
}
