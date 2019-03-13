import React from 'react';

import * as cssModule from './Button2.module.scss'

const Button2 = (props: {title: string }) => {
  let { title } = props

  return (
    <div className={cssModule.button}>
      Button: {title}
    </div>
  )
}

export {Button2}
