import { callGlobal } from '../util/IframeRpc'

const tms2 = {
  getMeteorUser: async () => {
    return await callGlobal('getMeteorUser')
  },
}
export { tms2 }
