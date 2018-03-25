import React from 'react'

import Button from 'components/Button'
import Input from 'components/Input'
import ErrorMsg from 'components/ErrorMsg'

const SubmitBar = ({ inputVal, label, handleChange, handleSubmit, errorMsg, buttonText }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input id='textField' label={label} type='text' value={inputVal}
          onChange={handleChange} />
        <Button id='sendBtn' type='submit'> {buttonText} </Button>
        {errorMsg && <ErrorMsg > {errorMsg} </ErrorMsg>}
      </form>
    </div>
  )
}

export default SubmitBar
