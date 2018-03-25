import React from 'react'

import './style.scss'

export default ({ message, myMessage }) => (
  <div styleName={myMessage ? 'my-message-wrapper' : 'chat-message-wrapper'}>
    <div styleName='chat-message'>
      {!myMessage && <span>{message.from}:</span>}
      <p>
        {message.content}
      </p>
    </div>
  </div>
)
