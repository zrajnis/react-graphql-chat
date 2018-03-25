import React from 'react'

import Button from 'components/Button'
import Input from 'components/Input'
import ErrorMsg from 'components/ErrorMsg'

const SubmitBar = ({ inputVal, label, legend, handleChange, handleSubmit, errorMsg, buttonText }) => {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend> {legend} </legend>
        <Input id='textField' label={label} type='text' value={inputVal}
          onChange={handleChange} />
        <Button id='sendBtn' type='submit'> {buttonText} </Button>
        {errorMsg && <ErrorMsg > {errorMsg} </ErrorMsg>}
      </fieldset>
    </form>
  )
}

export default SubmitBar
