import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Button = ({ id, children, ...rest }) =>
  <button
    id={id}
    styleName='button'
    {...rest}
  >
    {children}
  </button>

Button.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.string
}

export default Button
