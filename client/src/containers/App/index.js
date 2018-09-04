import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import { ALL_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION, SUBSCRIBE_TO_NEW_MESSAGES } from 'queries/chat'
import { CREATE_USER_MUTATION, DELETE_USER_MUTATION } from 'queries/user'
import Chat from 'containers/Chat'
import Login from 'containers/Login'
import withApollo from 'utils/withApollo'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      user: {
        id: null,
        name: ''
      }
    }
    this.createUser = this.createUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.logUserIn = this.logUserIn.bind(this)
    this.subscribeToNewMessages = this.subscribeToNewMessages.bind(this)
  }

  async createUser (name) {
    const { createUserMutation } = this.props

    return createUserMutation({
      variables: { name }
    })
  }

  deleteUser () {
    const { user: { id } } = this.state

    if (id) {
      const { deleteUserMutation } = this.props

      deleteUserMutation({
        variables: { id }
      })
    }
  }

  logUserIn (user) {
    this.setState({ user })
  }

  handleContentChange ({ target: { value } }) {
    this.setState({ message: value })
  }

  async handleSubmit (e) {
    e.preventDefault()
    const { message, user: { name } } = this.state

    if (!message.trim()) {
      return
    }

    const { createMessageMutation } = this.props

    await createMessageMutation({
      variables: {
        content: message,
        from: name
      }
    })
    this.setState({ message: '' })
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
    const { createUser, handleContentChange, handleSubmit, logUserIn } = this
    const { message, user } = this.state
    const { allMessages } = this.props.allMessagesQuery

    if (!user.id) {
      return (
        <Login
          createUser={createUser}
          logUserIn={logUserIn}
        />
      )
    }

    return (
      <Chat
        allMessages={allMessages}
        content={message}
        handleChange={handleContentChange}
        handleSubmit={handleSubmit}
        username={user.name}
      />
    )
  }
}

App.propTypes = {
  allMessagesQuery: PropTypes.shape({
    allMessages: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired
      })
    ),
    subscribeToMore: PropTypes.func.isRequired
  }),
  createMessageMutation: PropTypes.func.isRequired,
  createUserMutation: PropTypes.func.isRequired,
  deleteUserMutation: PropTypes.func.isRequired
}

App.defaultProps = {
  allMessagesQuery: {
    allMessages: []
  }
}

export const BasicApp = App

const ComposedApp = compose(
  graphql(ALL_MESSAGES_QUERY, { name: 'allMessagesQuery' }),
  graphql(CREATE_MESSAGE_MUTATION, { name: 'createMessageMutation' }),
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(DELETE_USER_MUTATION, { name: 'deleteUserMutation' })
)(App)

export default withApollo(ComposedApp)
