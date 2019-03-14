import React from 'react'

import { callGlobal } from './IframeRpc'

const tms2 = {
  getXkcdRandomNumber: async (numberToAdd: number) => {
    return await callGlobal('getXkcdRandomNumber', numberToAdd)
  },
  getActualRandomNumber: async (max: number) => {
    return await callGlobal('getActualRandomNumber', max)
  },
}

const IFrameTest = (props: {}) => {
  const onClick1 = async () => {
    let number = await tms2.getXkcdRandomNumber(1)
    alert('result was ' + number)
  }
  const onClick2 = async () => {
    let number = await tms2.getActualRandomNumber(100)
    alert('result was ' + number)
  }
  return (
    <div>
      Iframe test goes here
      <div>
        <button onClick={onClick1}>Do it 1</button>
        <button onClick={onClick2}>Do it 2</button>
      </div>
    </div>
  )
}

export { IFrameTest }
