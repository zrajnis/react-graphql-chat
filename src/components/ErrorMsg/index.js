import React from 'react'

import './style.scss'

const ErrorMsg = ({ children, ...rest }) => 
  <div styleName="error-msg" {...rest}> {children} </div>

export default ErrorMsg
