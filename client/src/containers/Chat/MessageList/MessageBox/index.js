import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const MessageBox = ({ message, myMessage }) => (
  <li styleName={myMessage ? 'my-message-wrapper' : 'chat-message-wrapper'}>
    <div styleName='chat-message'>
      {!myMessage && <span>{message.from}:</span>}
      <p>
        {message.content}
      </p>
    </div>
  </li>
)

MessageBox.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired
  }).isRequired,
  myMessage: PropTypes.bool.isRequired
}

export default MessageBox
