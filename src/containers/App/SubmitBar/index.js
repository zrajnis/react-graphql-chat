import React from 'react'

import Button from 'components/Button'
import Input from 'components/Input'

const SubmitBar = ({ inputVal, handleChange, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input id="textField" label="Insert a text message" type="text" value={inputVal} onChange={handleChange} />
        <Button id="sendBtn" type="submit"> Send </Button>
      </form>
    </div>
  )
}

export default SubmitBar
