import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { setTimeout } from 'timers'

import { CREATE_USER_MUTATION, DELETE_USER_MUTATION } from 'queries/user'
import { USERNAME_INVALID_PATTERN, USERNAME_INVALID_LENGTH, USERNAME_TAKEN } from 'constants/error'
import SubmitBar from 'components/SubmitBar'

import './style.scss'

class Landing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMsg: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  showError (msg) {
    this.setState({ errorMsg: msg })
    setTimeout(() => this.setState({ errorMsg: null }), 2000)
  }

  validateName () {
    const { name } = this.props
    const pattern =  name.trim() && name.trim().match(/^[a-zA-Z0-9]{0,}$/)
    const length = name.trim().match(/^[a-zA-Z0-9]{0,16}$/)

    if (!pattern) {
      this.showError(USERNAME_INVALID_PATTERN)
    }
    else if (!length) {
      this.showError(USERNAME_INVALID_LENGTH)
    }
    return pattern && length
  }

  async handleSubmit (e) {
    e.preventDefault()

    if(!this.validateName()) {
      return
    }

    const name = this.props.name.trim()
    const { logUserIn } = this.props

    try {
      const resp = await this.props.createUserMutation({
        variables: { name },
      })
      logUserIn(resp.data.createUser.id)
    } catch (e) {
      this.showError(USERNAME_TAKEN)
    }
  }

  render () {
    return (
      <div styleName='landing-container'> 
        <SubmitBar handleChange={this.props.handleChange} inputVal={this.props.name} 
          label='Choose your username' handleSubmit={this.handleSubmit}
          errorMsg={this.state.errorMsg} buttonText='Submit'/>
      </div>
    )
  }
}

export default graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' })(Landing)
