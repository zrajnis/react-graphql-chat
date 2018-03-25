import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import { CREATE_USER_MUTATION, DELETE_USER_MUTATION } from 'queries/user'
import SubmitBar from 'components/SubmitBar'
import { setTimeout } from 'timers'

import './style.scss'

class Landing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (e) {
    e.preventDefault()
    const name = this.props.name.trim()
    const { logUserIn } = this.props
    try {
      const resp = await this.props.createUserMutation({
        variables: { name },
      })
      logUserIn(resp.data.createUser.id)


    } catch (e) {
      this.setState({ error: true })
      setTimeout(() => this.setState({ error: false }), 1500)
    }
  }

  render () {
    return (
      <div styleName='landing-container'> 
        <SubmitBar handleChange={this.props.handleChange} inputVal={this.props.name} 
          label='Choose your username' handleSubmit={this.handleSubmit}
          error={this.state.error} errorMsg='Username already taken.' buttonText='Submit'/>
      </div>
    )
  }
}

export default graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' })(Landing)
