import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import { ALL_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION, SUBSCRIBE_TO_CREATED_MESSAGES } from 'queries/chat'
import { ALL_USERS_QUERY, CREATE_USER_MUTATION, DELETE_USER_MUTATION,
  SUBSCRIBE_TO_CREATED_USERS, SUBSCRIBE_TO_DELETED_USERS } from 'queries/user'
import Chat from 'containers/Chat'
import Login from 'containers/Login'
import setupListeners from 'utils/setupListeners'
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
    this.subscribeToDeletedUsers = this.subscribeToDeletedUsers.bind(this)
    this.subscribeToCreatedMessages = this.subscribeToCreatedMessages.bind(this)
    this.subscribeToCreatedUsers = this.subscribeToCreatedUsers.bind(this)
  }

  async createUser (name) {
    const { createUserMutation } = this.props

    return createUserMutation({
      variables: { name }
    })
  }

  async deleteUser () {
    const { user: { id } } = this.state

    if (id) {
      const { deleteUserMutation } = this.props
      const emptyUser = {
        id: null,
        name: ''
      }

      await deleteUserMutation({
        variables: { id }
      })
      this.setState({ user: emptyUser })
    }
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

  logUserIn (user) {
    const { deleteUser } = this

    this.setState({ user })
    setupListeners(deleteUser)
  }

  subscribeToCreatedMessages () {
    const { allMessagesQuery: { subscribeToMore } } = this.props

    subscribeToMore({
      document: SUBSCRIBE_TO_CREATED_MESSAGES,
      updateQuery (previous, { subscriptionData }) {
        return {
          ...previous,
          allMessages: [
            ...previous.allMessages,
            subscriptionData.data.createdMessage
          ]
        }
      }
    })
  }

  subscribeToCreatedUsers () {
    const { allUsersQuery: { subscribeToMore } } = this.props

    subscribeToMore({
      document: SUBSCRIBE_TO_CREATED_USERS,
      updateQuery (previous, { subscriptionData }) {
        return {
          ...previous,
          allUsers: [
            ...previous.allUsers,
            subscriptionData.data.createdUser
          ]
        }
      }
    })
  }

  subscribeToDeletedUsers () {
    const { allUsersQuery: { subscribeToMore } } = this.props

    subscribeToMore({
      document: SUBSCRIBE_TO_DELETED_USERS,
      updateQuery (previous, { subscriptionData }) {
        const allUsers = [
          ...previous.allUsers.filter(user =>
            user.id !== subscriptionData.data.deletedUser.id
          )
        ]

        return {
          ...previous,
          allUsers
        }
      }
    })
  }

  componentDidMount () {
    const {
      subscribeToCreatedMessages,
      subscribeToCreatedUsers,
      subscribeToDeletedUsers
    } = this

    subscribeToCreatedMessages()
    subscribeToCreatedUsers()
    subscribeToDeletedUsers()
  }

  render () {
    const { createUser, handleContentChange, handleSubmit, logUserIn } = this
    const { message, user } = this.state
    const { allMessages } = this.props.allMessagesQuery
    const { allUsers } = this.props.allUsersQuery

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
        allUsers={allUsers}
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
  allUsersQuery: PropTypes.shape({
    allUsers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
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
  },
  allUsersQuery: {
    allUsers: []
  }
}

export const BasicApp = App

const ComposedApp = compose(
  graphql(ALL_MESSAGES_QUERY, { name: 'allMessagesQuery' }),
  graphql(ALL_USERS_QUERY, { name: 'allUsersQuery' }),
  graphql(CREATE_MESSAGE_MUTATION, { name: 'createMessageMutation' }),
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(DELETE_USER_MUTATION, { name: 'deleteUserMutation' })
)(App)

export default withApollo(ComposedApp)
