import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import { USERNAME_INVALID_PATTERN, USERNAME_INVALID_LENGTH, USERNAME_TAKEN } from 'constants/error'
import Login from 'containers/Login'

describe('Login container test', () => {
  const createUserMock = jest.fn()
  const logUserInMock = jest.fn()
  const handleChangeSpy = sinon.spy(Login.prototype, 'handleChange')
  const validateNameSpy = sinon.spy(Login.prototype, 'validateName')
  const showErrorSpy = sinon.spy(Login.prototype, 'showError')
  const login = mount(
    <Login
      createUser={createUserMock}
      logUserIn={logUserInMock}
    />
  )

  const fakeName = 'test'

  beforeEach(() => {
    createUserMock.mockReset()
    logUserInMock.mockReset()
    handleChangeSpy.resetHistory()
    validateNameSpy.resetHistory()
    showErrorSpy.resetHistory()
  })

  it('Submits the valid value', async () => {
    const fakeResponse = {
      data: {
        createUser: {
          id: 'testId'
        }
      }
    }
    const fakeUser = {
      id: fakeResponse.data.createUser.id,
      name: fakeName
    }

    createUserMock.mockResolvedValue(fakeResponse)
    login.find('input').simulate('change', { target: { value: fakeName } })
    login.find('button').simulate('submit', { target: login.find('button').get(0) })

    expect(handleChangeSpy.calledOnce).toBe(true)
    expect(validateNameSpy.calledOnce).toBe(true)
    expect(validateNameSpy.returnValues[0]).toBe(true)
    await expect(createUserMock).toHaveBeenCalledWith(fakeName)
    expect(logUserInMock).toHaveBeenCalledWith(fakeUser)
  })

  it('Shows an error when username is already in use', async () => {
    createUserMock.mockRejectedValue(new Error('username taken'))
    login.find('input').simulate('change', { target: { value: fakeName } })
    login.find('button').simulate('submit', { target: login.find('button').get(0) })

    expect(handleChangeSpy.calledOnce).toBe(true)
    expect(validateNameSpy.calledOnce).toBe(true)
    expect(validateNameSpy.returnValues[0]).toBe(true)
    await expect(createUserMock).toHaveBeenCalledWith(fakeName)
    expect(logUserInMock).not.toHaveBeenCalled()
    expect(showErrorSpy.calledOnceWith(USERNAME_TAKEN)).toBe(true)
  })

  it('Shows an error for a name with invalid pattern', () => {
    const fakeNameInvalidPattern = '__test__'

    login.find('input').simulate('change', { target: { value: fakeNameInvalidPattern } })
    login.find('button').simulate('submit', { target: login.find('button').get(0) })

    expect(handleChangeSpy.calledOnce).toBe(true)
    expect(validateNameSpy.calledOnce).toBe(true)
    expect(validateNameSpy.returnValues[0]).toBe(false)
    expect(showErrorSpy.calledOnceWith(USERNAME_INVALID_PATTERN)).toBe(true)
  })

  it('Shows an error for a name with invalid length', () => {
    const fakeNameInvalidLength = 'thisnameistoolongtobevalid'

    login.find('input').simulate('change', { target: { value: fakeNameInvalidLength } })
    login.find('button').simulate('submit', { target: login.find('button').get(0) })

    expect(handleChangeSpy.calledOnce).toBe(true)
    expect(validateNameSpy.calledOnce).toBe(true)
    expect(validateNameSpy.returnValues[0]).toBe(false)
    expect(showErrorSpy.calledOnceWith(USERNAME_INVALID_LENGTH)).toBe(true)
  })
})
