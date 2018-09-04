import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SubmitBar from 'components/SubmitBar'
import MessageList from 'containers/Chat/MessageList'
import './style.scss'

class Chat extends Component {
  componentDidMount () {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  componentDidUpdate () {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  render () {
    const { allMessages, content, username, handleChange, handleSubmit } = this.props

    return (
      <div styleName='chat'>
        <MessageList
          allMessages={allMessages}
          username={username}
        />
        <SubmitBar
          buttonText='Send'
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          inputVal={content}
          label='Insert a text message'
          legend='Insert a text message'
        />
        <div ref={(el) => { this.messagesEnd = el }} />
      </div>
    )
  }
}

Chat.propTypes = {
  allMessages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired
    })
  ),
  content: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Chat
