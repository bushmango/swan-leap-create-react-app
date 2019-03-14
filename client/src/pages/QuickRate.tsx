import React from 'react'

import * as midboss from 'midboss'
import * as stateQuickRate from '../state/stateQuickRate'

const QuickRate = (props: {}) => {
  const state = midboss.useSubscription(stateQuickRate.stateManager)

  React.useEffect(() => {
    if (!state.fetchedShipment) {
      stateQuickRate.fetchShipment()
    }
  })

  return (
    <div>
      Quick rate demo goes here
      <div>isloading? {'' + state.isLoading}</div>
      <pre>{JSON.stringify(state.fetchedShipment, null, 2)}</pre>
      <button
        onClick={() => {
          stateQuickRate.fetchShipment()
        }}
      >
        Refresh
      </button>
    </div>
  )
}

export { QuickRate }
