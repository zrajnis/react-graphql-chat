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
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  id: PropTypes.string,
}

export default Button
