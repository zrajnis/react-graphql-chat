import React from 'react'
import PropTypes from 'prop-types'

import UserBox from 'containers/Chat/UserList/UserBox'
import './style.scss'

const UserList = ({ allUsers, username }) =>
  <div styleName='user-list-wrapper'>
    <em styleName='user-list-title'>USERS ONLINE</em>
    <ul styleName='user-list'>
      {allUsers.map(user => (
        <UserBox
          key={user.id}
          myUsername={user.name === username}
          username={user.name}
        />
      ))}
    </ul>
  </div>

UserList.propTypes = {
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  username: PropTypes.string.isRequired
}

export default UserList
