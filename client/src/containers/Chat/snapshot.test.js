import React from 'react'
import renderer from 'react-test-renderer'

import Chat from 'containers/Chat'

describe('Chat container snapshot', () => {
  const mockFn = jest.fn()
  const username = 'testUser'
  const allMessages = [{
    content: 'test content 123',
    from: username,
    id: '1'
  }, {
    content: 'test content 456',
    from: 'testUser1',
    id: '2'
  }, {
    content: 'test content 678',
    from: 'testUser2',
    id: '3'
  }]
  const allUsers = [{
    id: '1',
    name: 'test1'
  }, {
    id: '2',
    name: username
  }]
  const content = 'test content'
  const createNodeMock = () => ({
    scrollIntoView () {}
  })

  it('renders the chat container', () => {
    const tree = renderer.create(
      <Chat
        allMessages={allMessages}
        allUsers={allUsers}
        content={content}
        handleChange={mockFn}
        handleSubmit={mockFn}
        username={username}
      />, { createNodeMock }
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
