import * as midboss from 'midboss'
const midbossKey = 'history'
export { midbossKey }

import minimongo from 'minimongo'
import * as _ from 'lodash'
import fetch from 'isomorphic-unfetch'

const host = process.env.host

interface IStateQuickRate {
  isLoading: boolean
  fetchedShipment: any
  // fetchedShipment: {
  //   error?: string
  //   data?: any
  // }
}

let initialState: IStateQuickRate = {
  isLoading: false,
  fetchedShipment: null,
}

const stateManager = midboss.createMidboss(midbossKey, '1.0.0', initialState, {
  useLocalStorage: true,
})
export { stateManager }

let minimongoUrl = 'http://localhost:3008/minimongo-api/v1/'

export async function fetchShipment() {
  const _id = '224f6aTAEFpzGGNzf'

  stateManager.produce(ds => {
    ds.isLoading = true
  })

  let db = new minimongo.RemoteDb(minimongoUrl, 'myclientid123')
  db.addCollection('shipments')
  let query = db.shipments.find({ _id: _id }, { limit: 1 })
  query.fetch(res => {
    stateManager.produce(draftState => {
      draftState.fetchedShipment = res
      draftState.isLoading = false
    })
  })

  // const res = await fetch(host + '/cows-list')
  // const fetchedHistory = await res.json()
  // stateManager.produce(draftState => {
  //   draftState.fetchedHistory = fetchedHistory
  // })
}
