import React from 'react';

import * as cssModule from './Button.module.scss'

const Button = (props: {title: string }) => {
  let { title } = props

  return (
    <div className={cssModule.button}>
      Button: {title}
    </div>
  )
}

export {Button}
