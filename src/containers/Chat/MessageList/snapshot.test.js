import React from 'react'
import renderer from 'react-test-renderer'
import MessageList from 'containers/Chat/MessageList'

describe('Message list component snapshot', () => {
  const username = 'testUser'
  const allMessages = [{
    content: 'test content 123',
    from: username,
    id: 1
  }, {
    content: 'test content 456',
    from: 'testUser1',
    id: 2
  }, {
    content: 'test content 678',
    from: 'testUser2',
    id: 3
  }]

  it('renders the message list', () => {
    const tree = renderer.create(
      <MessageList
        allMessages={allMessages}
        username={username}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
