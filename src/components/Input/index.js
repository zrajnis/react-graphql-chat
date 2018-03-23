import React from 'react'
import PropTypes from 'prop-types'

const Input = props => {
  const { id, label, ...rest } = props

  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>
      <input id={id} {...rest} />
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
}

export default Input
