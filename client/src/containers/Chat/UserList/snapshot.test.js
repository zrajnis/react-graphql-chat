import React from 'react'
import renderer from 'react-test-renderer'

import MessageList from 'containers/Chat/UserList'

describe('User list component snapshot', () => {
  const username = 'testUser'
  const allUsers = [{
    id: '1',
    name: 'testUser1'
  }, {
    id: '2',
    name: username
  }, {
    id: '3',
    name: 'testUser2'
  }]

  it('renders the user list', () => {
    const tree = renderer.create(
      <MessageList
        allUsers={allUsers}
        username={username}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
