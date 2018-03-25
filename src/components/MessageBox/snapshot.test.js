import React from 'react'
import renderer from 'react-test-renderer'
import MessageBox from 'components/MessageBox'

describe('Message box component snapshot', () => {
  it('renders the message box', () => {
    const message = {
      from: 'testUser',
      content: 'test content 123',
    }
    const tree = renderer.create(
      <MessageBox message={message} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
