import React, { Component } from 'react'
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
      from: '',
      content: '',
      loggedIn: false,
      id: null,
    }

    this.deleteUser = this.deleteUser.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.logUserIn = this.logUserIn.bind(this)
  }

  async deleteUser () {
    const { id } = this.state
    id && await this.props.deleteUserMutation({
      variables: { id },
    })
  }

  logUserIn (id) {
    this.setState({ 
      id,
      loggedIn: true,
    })
  }

  handleContentChange (e) {
    this.setState({ content: e.target.value })
  }

  handleNameChange (e) {
    this.setState({ from: e.target.value })
  }

  async handleSubmit (e) {
    e.preventDefault()
    const { content, from } = this.state
    await this.props.createMessageMutation({
      variables: { content, from },
    })
    this.setState({ content: '' })
  }

  scrollToBottom () {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  subscribeToNewMessages () {
    this.props.allMessagesQuery.subscribeToMore({
      document: SUBSCRIBE_TO_NEW_MESSAGES,
      updateQuery: (previous, { subscriptionData }) => {
        const newMessageLinks = [
          ...previous.allMessages,
          subscriptionData.data.Message.node,
        ]
        const result = {
          ...previous,
          allMessages: newMessageLinks,
        }
        return result
      },
    })
  }

  componentDidMount () {
    window.onunload = () => {
      this.deleteUser()
      return 
    }
    window.onbeforeunload = () => {
      this.deleteUser()
      return 
    }
    this.subscribeToNewMessages()
  }

  componentDidUpdate () {
    this.state.loggedIn && this.scrollToBottom()
  }

  render () {
    const allMessages = this.props.allMessagesQuery.allMessages || []
    return (
      this.state.loggedIn ?
        <div styleName='chat'>
          <div styleName='message-container'>
            <h1>React GraphQL Chat</h1>
            {allMessages.map(message => (
              <MessageBox key={message.id} message={message} />
            ))}
          </div>
          <SubmitBar handleChange={this.handleContentChange} label='Insert a text message'
            inputVal={this.state.content} handleSubmit={this.handleSubmit}
            error={false} buttonText='Send'/>
          <div ref={(el) => { this.messagesEnd = el }}></div>
        </div>
        :
        <Landing name={this.state.from} handleChange={this.handleNameChange} logUserIn={this.logUserIn} />
    )
  }
}

export default compose(
  graphql(ALL_MESSAGES_QUERY, { name: 'allMessagesQuery' }),
  graphql(DELETE_USER_MUTATION, { name: 'deleteUserMutation' }),
  graphql(CREATE_MESSAGE_MUTATION, { name: 'createMessageMutation' })
)(Chat)
