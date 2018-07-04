import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import MessageBox from 'containers/Chat/MessageList/MessageBox'

const MessageList = ({ allMessages, from }) =>
  <Fragment>
    {allMessages.map(message => (
      <MessageBox
        key={message.id}
        message={message}
        myMessage={message.from === from}
      />
    ))}
  </Fragment>

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
