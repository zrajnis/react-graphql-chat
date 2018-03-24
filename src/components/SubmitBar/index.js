import React from 'react'

import Button from 'components/Button'
import Input from 'components/Input'
import ErrorMsg from 'components/ErrorMsg'
import './style.scss'

const SubmitBar = ({ inputVal, label, handleChange, handleSubmit, error, errorMsg, buttonText }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input id='textField' label={label} type='text' value={inputVal}
          onChange={handleChange} />
        {error && <ErrorMsg > {errorMsg} </ErrorMsg>}
        <Button id='sendBtn' type='submit'> {buttonText} </Button>
      </form>
    </div>
  )
}

export default SubmitBar
