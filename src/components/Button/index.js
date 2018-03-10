import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  return (
    <button id={props.id}>
      {props.children}
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
