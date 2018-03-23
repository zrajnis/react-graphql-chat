import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import { ALL_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION } from 'queries/chat'
import Chatbox from 'components/Chatbox'
import SubmitBar from 'containers/App/SubmitBar'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      from: 'anonymous',
      content: '',
    }
    this.submitMessage = this.submitMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEnterSubmit = this.handleEnterSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({content: e.target.value})
  }

  async submitMessage () {
    const { content, from } = this.state
    await this.props.createMessageMutation({
      variables: { content, from },
    })
    this.setState({ content: '' })
  }

  handleEnterSubmit (e) {
    if (e.key === 'Enter') {
      this.submitMessage()
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
        <SubmitBar handleChange={this.handleChange} 
          handleEnterSubmit={this.handleEnterSubmit} inputVal={this.state.content} handleClickSubmit={this.submitMessage}/>
      </div>
    )
  }
}

export default compose(
  graphql(ALL_MESSAGES_QUERY, {name: 'allMessagesQuery'}),
  graphql(CREATE_MESSAGE_MUTATION, {name: 'createMessageMutation'})
)(Chat)
