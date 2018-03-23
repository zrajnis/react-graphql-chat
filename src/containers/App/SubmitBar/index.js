import React from 'react'

import Button from 'components/Button'
import Input from 'components/Input'

const SubmitBar = ({ inputVal, handleClickSubmit, handleChange, handleEnterSubmit }) => {
  return (
    <div>
      <Input id="textField" label="Insert a text message" type="text" value={inputVal} onChange={handleChange} onKeyPress={handleEnterSubmit} />
      <Button id="sendBtn" onClick={handleClickSubmit}> Send </Button>
    </div>
  )
}

export default SubmitBar
