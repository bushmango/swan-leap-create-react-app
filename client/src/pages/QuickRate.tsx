import React from 'react'

import * as midboss from 'midboss'
import * as stateQuickRate from '../state/stateQuickRate'

const QuickRate = (props: {}) => {
  const state = midboss.useSubscription(stateQuickRate.stateManager)

  React.useEffect(() => {
    if (!state.fetchedShipment) {
      stateQuickRate.fetchShipment()
    }
    if (!state.tms2User) {
      stateQuickRate.fetchCurrentUser()
    }
  })

  return (
    <div>
      Quick rate react edition
      {/* <div>isloading? {'' + state.isLoading}</div> */}
      {/* <pre>{JSON.stringify(state.fetchedShipment, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(state.tms2User, null, 2)}</pre> */}
      {state.tms2User && (
        <div>
          Logged in user: <strong>{state.tms2User.username}</strong>
        </div>
      )}
      <button
        onClick={() => {
          stateQuickRate.fetchCurrentUser()
        }}
      >
        Refresh
      </button>
    </div>
  )
}

export { QuickRate }
