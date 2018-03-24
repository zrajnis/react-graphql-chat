import React from 'react'

import Button from 'components/Button'
import Input from 'components/Input'
import './style.scss'

const SubmitBar = ({ inputVal, handleChange, handleSubmit, error, errorMsg }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input id='textField' label='Insert a text message' type='text' value={inputVal} onChange={handleChange} />
        <Button id='sendBtn' type='submit'> Send </Button>
        {error && <label for="textField" styleName='error-msg'>{errorMsg}</label>}
      </form>
    </div>
  )
}

export default SubmitBar
