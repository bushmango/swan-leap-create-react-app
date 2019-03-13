import React from 'react';

import * as cssModule from './ButtonAlt.module.scss'

const ButtonAlt = (props: {title: string, isRed?: boolean }) => {
  let { title, isRed } = props

  return (
    <div className={ cssModule.buttonBlue + (isRed ? ' ' + cssModule.buttonRed : '') }>
      Button: {title}
    </div>
  )
}

export {ButtonAlt}
