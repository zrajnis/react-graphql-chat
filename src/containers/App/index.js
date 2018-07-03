import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import { ALL_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION, SUBSCRIBE_TO_NEW_MESSAGES } from 'queries/chat'
import { DELETE_USER_MUTATION } from 'queries/user'
import Chat from 'containers/Chat'
import Login from 'containers/Login'
import withApollo from 'utils/withApollo'

class App extends Component {
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

  render () {
    const { handleContentChange, handleNameChange, handleSubmit, logUserIn } = this
    const { content, from, loggedIn } = this.state
    const { allMessages } = this.props.allMessagesQuery

    if (!loggedIn) {
      return (
        <Login
          handleChange={handleNameChange}
          logUserIn={logUserIn}
          name={from}
        />
      )
    }

    return (
      <Chat
        allMessages={allMessages}
        content={content}
        from={from}
        handleChange={handleContentChange}
        handleSubmit={handleSubmit}
      />
    )
  }
}

App.propTypes = {
  allMessagesQuery: PropTypes.shape({
    allMessages: PropTypes.array,
    subscribeToMore: PropTypes.func.isRequired
  })
}

App.defaultProps = {
  allMessagesQuery: {
    allMessages: []
  }
}

const composedApp = compose(
  graphql(ALL_MESSAGES_QUERY, { name: 'allMessagesQuery' }),
  graphql(DELETE_USER_MUTATION, { name: 'deleteUserMutation' }),
  graphql(CREATE_MESSAGE_MUTATION, { name: 'createMessageMutation' })
)(App)

export default withApollo(composedApp)
