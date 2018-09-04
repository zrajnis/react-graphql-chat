import 'jsdom-global/register'
import React from 'react'
import { shallow } from 'enzyme'

import { BasicApp } from 'containers/App'

describe('App container test', () => {
  let app
  const createMessageMutationMock = jest.fn()
  const createUserMutationMock = jest.fn()
  const deleteUserMutationMock = jest.fn()
  const subscribeToMoreMock = jest.fn()
  const allMessagesQuery = {
    allMessages: [],
    subscribeToMore: subscribeToMoreMock
  }

  const fakeName = 'fakeName'
  const fakeUser = {
    id: 'fakeId',
    name: fakeName
  }

  beforeEach(() => {
    createMessageMutationMock.mockReset()
    createUserMutationMock.mockReset()
    deleteUserMutationMock.mockReset()
    subscribeToMoreMock.mockReset()
    app = shallow(
      <BasicApp
        allMessagesQuery={allMessagesQuery}
        createMessageMutation={createMessageMutationMock}
        createUserMutation={createUserMutationMock}
        deleteUserMutation={deleteUserMutationMock}
      />
    )
  })

  it('Renders the Chat container when user logs in', () => {
    app.instance().logUserIn(fakeUser)
    app.update()

    expect(app.find('Chat').length).toBe(1)
  })

  it('Renders the Login container if user isn\'t logged in', () => {
    expect(app.find('Login').length).toBe(1)
  })

  it('Calls createUser which results with createuserMutation being called', () => {
    app.instance().createUser(fakeName)

    expect(createUserMutationMock).toHaveBeenCalled()
  })

  it('Calls deleteUser which calls deleteUserMutation if user is logged in', () => {
    app.instance().logUserIn(fakeUser)
    app.instance().deleteUser()
    expect(deleteUserMutationMock).toHaveBeenCalled()
  })

  it('Calls deleteUser which does nothing if user is not logged in', () => {
    app.instance().deleteUser()
    expect(deleteUserMutationMock).not.toHaveBeenCalled()
  })

  it('Submits a new message to the server', async () => {
    const fakeMessage = 'fakeMessage'
    const fakeEvent = {
      preventDefault: jest.fn(),
      target: {
        value: fakeMessage
      }
    }
    const expectedArguments = {
      variables: {
        content: fakeMessage,
        from: fakeName
      }
    }

    app.instance().logUserIn(fakeUser)
    app.instance().handleContentChange(fakeEvent)
    await app.instance().handleSubmit(fakeEvent)

    expect(createMessageMutationMock).toHaveBeenCalledWith(expectedArguments)
    expect(app.state().message).toBe('')
  })

  it('Doesn\'t submit an empty message to the server', async () => {
    const fakeMessage = ' '
    const fakeEvent = {
      preventDefault: jest.fn(),
      target: {
        value: fakeMessage
      }
    }

    app.instance().logUserIn(fakeUser)
    app.instance().handleContentChange(fakeEvent)
    await app.instance().handleSubmit(fakeEvent)

    expect(createMessageMutationMock).not.toHaveBeenCalled()
    expect(app.state().message).toBe(' ')
  })

  it('Submits to new messages and binds deleteUser when component mounts', () => {
    app.instance().logUserIn(fakeUser)
    window.onunload()
    app.instance().logUserIn(fakeUser)
    window.onbeforeunload()

    expect(subscribeToMoreMock).toHaveBeenCalled()
    expect(deleteUserMutationMock).toHaveBeenCalledTimes(2)
  })
})
