import React from 'react'

import Button from 'components/Button'
import Input from 'components/Input'

const SubmitBar = () => {
  return (
    <div>
      <Input id="textField" label="Insert a text message" type="text" />
      <Button id="sendBtn"> Send </Button>
    </div>
  )
}

export default SubmitBar
