import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import { ALL_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION, SUBSCRIBE_TO_NEW_MESSAGES } from 'queries/chat'
import { DELETE_USER_MUTATION } from 'queries/user'
import MessageBox from 'components/MessageBox'
import SubmitBar from 'components/SubmitBar'
import Landing from 'containers/Landing'
import './style.scss'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: '',
      from: '',
      id: null,
      loggedIn: false
    }
    this.deleteUser = this.deleteUser.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.logUserIn = this.logUserIn.bind(this)
    this.subscribeToNewMessages = this.subscribeToNewMessages.bind(this)
  }

  async deleteUser () {
    const { id } = this.state

    if (id) {
      const { deleteUserMutation } = this.props

      await deleteUserMutation({
        variables: { id }
      })
    }
  }

  logUserIn (id) {
    this.setState({
      id,
      loggedIn: true
    })
  }

  handleContentChange ({ target: { value } }) {
    this.setState({ content: value })
  }

  handleNameChange ({ target: { value } }) {
    this.setState({ from: value })
  }

  async handleSubmit (e) {
    e.preventDefault()
    const { content, from } = this.state

    if (!content.trim()) {
      return
    }

    const { createMessageMutation } = this.props

    await createMessageMutation({
      variables: {
        content,
        from
      }
    })
    this.setState({ content: '' })
  }

  scrollToBottom () {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  subscribeToNewMessages () {
    const { allMessagesQuery: { subscribeToMore } } = this.props

    subscribeToMore({
      document: SUBSCRIBE_TO_NEW_MESSAGES,
      updateQuery: (previous, { subscriptionData }) => {
        const newMessageLinks = [
          ...previous.allMessages,
          subscriptionData.data.Message.node
        ]
        const result = {
          ...previous,
          allMessages: newMessageLinks
        }

        return result
      }
    })
  }

  componentDidMount () {
    const { deleteUser, subscribeToNewMessages } = this

    window.onunload = () => {
      deleteUser()
    }
    window.onbeforeunload = () => {
      deleteUser()
    }
    subscribeToNewMessages()
  }

  componentDidUpdate () {
    this.state.loggedIn && this.scrollToBottom()
  }

  render () {
    const { handleContentChange, handleNameChange, handleSubmit, logUserIn } = this
    const { content, from, loggedIn } = this.state
    const { allMessages } = this.props.allMessagesQuery

    if (!loggedIn) {
      return (
        <Landing
          handleChange={handleNameChange}
          logUserIn={logUserIn}
          name={from}
        />
      )
    }

    return (
      <div styleName='chat'>
        <div styleName='message-container'>
          {allMessages.map(message => (
            <MessageBox
              key={message.id}
              message={message}
              myMessage={message.from === from}
            />
          ))}
        </div>
        <SubmitBar
          buttonText='Send'
          handleChange={handleContentChange}
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
  allMessagesQuery: PropTypes.shape({
    allMessages: PropTypes.array,
    subscribeToMore: PropTypes.func.isRequired
  })
}

Chat.defaultProps = {
  allMessagesQuery: {
    allMessages: []
  }
}

export default compose(
  graphql(ALL_MESSAGES_QUERY, { name: 'allMessagesQuery' }),
  graphql(DELETE_USER_MUTATION, { name: 'deleteUserMutation' }),
  graphql(CREATE_MESSAGE_MUTATION, { name: 'createMessageMutation' })
)(Chat)
