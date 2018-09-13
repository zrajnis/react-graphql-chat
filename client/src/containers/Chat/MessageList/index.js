import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MessageBox from 'containers/Chat/MessageList/MessageBox'
import './style.scss'

class MessageList extends Component {
  componentDidMount () {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  componentDidUpdate () {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  render () {
    const { allMessages, username } = this.props

    return (
      <ul styleName='message-list'>
        {allMessages.map(message => (
          <MessageBox
            key={message.id}
            message={message}
            myMessage={message.from === username}
          />
        ))}
        <li ref={(el) => { this.messagesEnd = el }} />
      </ul>
    )
  }
}

MessageList.propTypes = {
  allMessages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired
    })
  ),
  username: PropTypes.string.isRequired
}

export default MessageList
