import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MessageBox from 'components/MessageBox'
import SubmitBar from 'components/SubmitBar'
import './style.scss'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.mapMessages = this.mapMessages.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  mapMessages () {
    const { allMessages, from } = this.props

    return allMessages.map(message => (
      <MessageBox
        key={message.id}
        message={message}
        myMessage={message.from === from}
      />
    ))
  }

  componentDidMount () {
    this.scrollToBottom()
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom () {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  render () {
    const { mapMessages } = this
    const { content, handleChange, handleSubmit } = this.props

    return (
      <div styleName='chat'>
        <div styleName='message-container'>
          {mapMessages()}
        </div>
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
  allMessages: PropTypes.array.isRequired,
  content: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default Chat
