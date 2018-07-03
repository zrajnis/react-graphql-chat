import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Input from 'components/Input'
import ErrorMsg from 'components/ErrorMsg'

const SubmitBar = ({ buttonText, errorMsg, handleChange, handleSubmit, inputVal, label, legend }) => {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend> {legend} </legend>
        <Input
          id='textField'
          label={label}
          onChange={handleChange}
          type='text'
          value={inputVal}
        />
        <Button
          id='sendBtn'
          type='submit'
        >
          {buttonText}
        </Button>
        {errorMsg && <ErrorMsg > {errorMsg} </ErrorMsg>}
      </fieldset>
    </form>
  )
}

SubmitBar.propTypes = {
  buttonText: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  inputVal: PropTypes.string,
  label: PropTypes.string,
  legend: PropTypes.string.isRequired
}

SubmitBar.defaultProps = {
  errorMsg: ''
}

export default SubmitBar
