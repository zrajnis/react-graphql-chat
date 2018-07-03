import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const ErrorMsg = ({ children, ...rest }) =>
  <div
    styleName='error-msg'
    {...rest}
  >
    {children}
  </div>

ErrorMsg.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default ErrorMsg
