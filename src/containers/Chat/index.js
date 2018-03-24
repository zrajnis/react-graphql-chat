import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import { ALL_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION, SUBSCRIBE_TO_NEW_MESSAGES } from 'queries/chat'
import MessageBox from 'components/MessageBox'
import SubmitBar from 'components/SubmitBar'
import './style.scss'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      from: 'anonymous',
      content: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
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
    return false
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

  scrollToBottom () {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }  

  componentDidMount () {
    const from = window.prompt('username')
    from && this.setState({ from })
    this.subscribeToNewMessages()
    this.scrollToBottom()
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  render () {
    const allMessages = this.props.allMessagesQuery.allMessages || []
    return (
      <div styleName='chat'>
        <div styleName='message-container'>
          <h1>React GraphQL Chat</h1>
          {allMessages.map(message => (
            <MessageBox key={message.id} message={message} />
          ))}
        </div>
        <SubmitBar handleChange={this.handleContentChange} 
          inputVal={this.state.content} handleSubmit={this.handleSubmit}
          error={false} />
        <div ref={(el) => { this.messagesEnd = el }}></div>
      </div>
    )
  }
}

export default compose(
  graphql(ALL_MESSAGES_QUERY, { name: 'allMessagesQuery' }),
  graphql(CREATE_MESSAGE_MUTATION, { name: 'createMessageMutation' })
)(Chat)
