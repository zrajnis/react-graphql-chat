import React from 'react'

import './style.scss'

export default ({message}) => (
  <div styleName="chat-message">
    <span>{message.from}:</span>
    <p>
      {message.content}
    </p>
  </div>
)
