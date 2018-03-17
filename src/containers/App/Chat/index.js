import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import {ALL_MESSAGES_QUERY} from 'queries/chat'
import Chatbox from 'components/Chatbox'
import SubmitBar from 'containers/App/SubmitBar'

class Chat extends Component {
  constructor () {
    super()
    this.state = {
      from: 'anonymous',
      content: '',
    }
  }

  componentDidMount () {
    const from = window.prompt('username')
    from && this.setState({from})
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
        <SubmitBar />
      </div>
    )
  }
}

export default graphql(ALL_MESSAGES_QUERY, {name: 'allMessagesQuery'})(Chat)
