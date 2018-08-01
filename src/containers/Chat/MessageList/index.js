import React from 'react'
import PropTypes from 'prop-types'

import MessageBox from 'containers/Chat/MessageList/MessageBox'
import './style.scss'

const MessageList = ({ allMessages, from }) =>
  <div styleName='message-container'>
    {allMessages.map(message => (
      <MessageBox
        key={message.id}
        message={message}
        myMessage={message.from === from}
      />
    ))}
  </div>

MessageList.propTypes = {
  allMessages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired
    })
  ),
  from: PropTypes.string.isRequired
}

export default MessageList
