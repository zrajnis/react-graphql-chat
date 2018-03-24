import React from 'react'

import './style.scss'

const ErrorMsg = props => {
  const { children, ...rest } = props

  return (
    <div styleName="error-msg" {...rest}> {children} </div>
  )
}

export default ErrorMsg
