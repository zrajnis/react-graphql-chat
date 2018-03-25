import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ id, children, ...rest }) => {
  return (
    <button id={id} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.string,
}

export default Button
