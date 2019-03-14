import React from 'react'

import { Button } from '../components/Button'
import { ButtonAlt } from '../components/ButtonAlt'

const CssTests = (props: {}) => {
  return (
    <div>
      <Button title="button 1" />
      <Button title="another button" />
      <ButtonAlt title="differently styled button" isRed={false} />
      <ButtonAlt title="differently styled button" isRed={true} />
    </div>
  )
}

export { CssTests }
