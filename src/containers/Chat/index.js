import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import { ALL_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION, SUBSCRIBE_TO_NEW_MESSAGES } from 'queries/chat'
import Chatbox from 'components/Chatbox'
import SubmitBar from 'containers/SubmitBar'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      from: 'anonymous',
      content: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ content: e.target.value })
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

  componentDidMount () {
    const from = window.prompt('username')
    from && this.setState({ from })
    this.subscribeToNewMessages()
  }

  render () {
    const allMessages = this.props.allMessagesQuery.allMessages || []
    return (
      <div className="chat">
        <div className="container">
          <h1>React GraphQL Chat</h1>
          {allMessages.map(message => (
            <Chatbox key={message.id} message={message} />
          ))}
        </div>
        <SubmitBar handleChange={this.handleChange} 
          inputVal={this.state.content} handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default compose(
  graphql(ALL_MESSAGES_QUERY, { name: 'allMessagesQuery' }),
  graphql(CREATE_MESSAGE_MUTATION, { name: 'createMessageMutation' })
)(Chat)
