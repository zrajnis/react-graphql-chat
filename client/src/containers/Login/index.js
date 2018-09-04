import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setTimeout } from 'timers'

import { USERNAME_INVALID_PATTERN, USERNAME_INVALID_LENGTH, USERNAME_TAKEN } from 'constants/error'
import SubmitBar from 'components/SubmitBar'
import './style.scss'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMsg: '',
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showError = this.showError.bind(this)
    this.validateName = this.validateName.bind(this)
  }

  handleChange ({ target: { value } }) {
    this.setState({
      name: value.trim()
    })
  }

  async handleSubmit (e) {
    e.preventDefault()

    if (!this.validateName()) {
      return
    }

    const { name } = this.state
    const { createUser, logUserIn } = this.props

    try {
      const resp = await createUser(name)
      const user = {
        id: resp.data.createUser.id,
        name
      }

      logUserIn(user)
    } catch (e) {
      this.showError(USERNAME_TAKEN)
    }
  }

  showError (errorMsg) {
    this.setState({ errorMsg })
    setTimeout(() => this.setState({ errorMsg: null }), 2000)
  }

  validateName () {
    const { showError } = this
    const { name } = this.state
    const pattern = name && name.match(/^[a-zA-Z0-9]{0,}$/)
    const length = name.match(/^[a-zA-Z0-9]{0,16}$/)

    if (!pattern) {
      showError(USERNAME_INVALID_PATTERN)
    } else if (!length) {
      showError(USERNAME_INVALID_LENGTH)
    }

    return !!(pattern && length)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { errorMsg, name } = this.state

    return (
      <div styleName='login-container'>
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

Login.propTypes = {
  createUser: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired
}

export default Login
