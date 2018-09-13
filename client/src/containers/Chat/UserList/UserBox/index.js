import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const UserBox = ({ myUsername, username }) => (
  <li styleName={myUsername ? 'my-username' : 'username'}>
    {username}{myUsername && ' (You)'}
  </li>
)

UserBox.propTypes = {
  myUsername: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired
}

export default UserBox
