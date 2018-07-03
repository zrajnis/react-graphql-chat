import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { setTimeout } from 'timers'

import { CREATE_USER_MUTATION } from 'queries/user'
import { USERNAME_INVALID_PATTERN, USERNAME_INVALID_LENGTH, USERNAME_TAKEN } from 'constants/error'
import SubmitBar from 'components/SubmitBar'

import './style.scss'

class Landing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMsg: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showError = this.showError.bind(this)
  }

  showError (errorMsg) {
    this.setState({ errorMsg })
    setTimeout(() => this.setState({ errorMsg: null }), 2000)
  }

  validateName () {
    const { showError } = this
    const { name } = this.props
    const pattern = name.trim() && name.trim().match(/^[a-zA-Z0-9]{0,}$/)
    const length = name.trim().match(/^[a-zA-Z0-9]{0,16}$/)

    if (!pattern) {
      showError(USERNAME_INVALID_PATTERN)
    } else if (!length) {
      showError(USERNAME_INVALID_LENGTH)
    }

    return pattern && length
  }

  async handleSubmit (e) {
    e.preventDefault()

    if (!this.validateName()) {
      return
    }

    const name = this.props.name.trim()
    const { createUserMutation, logUserIn } = this.props

    try {
      const resp = await createUserMutation({
        variables: { name }
      })

      logUserIn(resp.data.createUser.id)
    } catch (e) {
      this.showError(USERNAME_TAKEN)
    }
  }

  render () {
    const { handleSubmit } = this
    const { errorMsg } = this.state
    const { handleChange, name } = this.props

    return (
      <div styleName='landing-container'>
        <SubmitBar
          buttonText='Submit'
          errorMsg={errorMsg}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          inputVal={name}
          label='Choose your username'
          legend='Insert username'
        />
      </div>
    )
  }
}

Landing.propTypes = {
  createUserMutation: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired,
  name: PropTypes.string
}

export default graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' })(Landing)
