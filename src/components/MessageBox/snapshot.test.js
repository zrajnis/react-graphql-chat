import React from 'react'
import renderer from 'react-test-renderer'
import MessageBox from 'components/MessageBox'

describe('Message box component snapshot', () => {
  const message = {
    content: 'test content 123',
    from: 'testUser'
  }

  it('renders the message box from logged in user', () => {
    const tree = renderer.create(
      <MessageBox
        message={message}
        myMessage
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the message box from other users', () => {
    const tree = renderer.create(
      <MessageBox
        message={message}
        myMessage={false}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
