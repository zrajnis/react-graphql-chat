import React from 'react'
import PropTypes from 'prop-types'

import MessageList from 'containers/Chat/MessageList'
import SubmitBar from 'components/SubmitBar'
import UserList from 'containers/Chat/UserList'
import './style.scss'

const Chat = ({ allMessages, allUsers, content, username, handleChange, handleSubmit }) =>
  <div styleName='chat'>
    <div styleName='row'>
      <MessageList
        allMessages={allMessages}
        username={username}
      />
      <UserList
        allUsers={allUsers}
        username={username}
      />
    </div>
    <SubmitBar
      buttonText='Send'
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      inputVal={content}
      label='Insert a text message'
      legend='Insert a text message'
    />
  </div>

Chat.propTypes = {
  allMessages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ),
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  content: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Chat
