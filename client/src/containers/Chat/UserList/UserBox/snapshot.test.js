import React from 'react'
import renderer from 'react-test-renderer'

import UserBox from 'containers/Chat/UserList/UserBox'

describe('User box component snapshot', () => {
  const username = 'testUser'

  it('renders the user box for a logged in user', () => {
    const tree = renderer.create(
      <UserBox
        myUsername
        username={username}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the user box for another user', () => {
    const tree = renderer.create(
      <UserBox
        myUsername={false}
        username={username}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
