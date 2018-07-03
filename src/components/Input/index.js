import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Input = ({ id, label, ...rest }) =>
  <div styleName='input-container'>
    <label htmlFor={id}> {label} </label>
    <input
      id={id}
      styleName='input'
      {...rest}
    />
  </div>

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string
}

Input.defaultProps = {
  label: ''
}

export default Input
