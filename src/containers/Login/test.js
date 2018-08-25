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

  const testResponse = {
    data: {
      createUser: {
        id: 'testId'
      }
    }
  }
  const testName = 'test'
  const testNameInvalidPattern = '__test__'
  const testNameInvalidLength = 'thisnameistoolongtobevalid '
  const testUser = {
    id: testResponse.data.createUser.id,
    name: testName
  }

  beforeEach(() => {
    createUserMock.mockReset()
    logUserInMock.mockReset()
    handleChangeSpy.resetHistory()
    validateNameSpy.resetHistory()
    showErrorSpy.resetHistory()
  })

  it('Submits the valid value', async () => {
    createUserMock.mockResolvedValue(testResponse)
    login.find('input').simulate('change', { target: { value: testName } })
    login.find('button').simulate('submit', { target: login.find('button').get(0) })

    expect(handleChangeSpy.calledOnce).toBe(true)
    expect(validateNameSpy.calledOnce).toBe(true)
    expect(validateNameSpy.returnValues[0]).toBe(true)
    await expect(createUserMock).toHaveBeenCalled()
    expect(createUserMock).toHaveBeenCalledWith(testName)
    expect(logUserInMock).toHaveBeenCalled()
    expect(logUserInMock).toHaveBeenCalledWith(testUser)
  })

  it('Shows error when username is already in use', async () => {
    createUserMock.mockRejectedValue(new Error('username taken'))
    login.find('input').simulate('change', { target: { value: testName } })
    login.find('button').simulate('submit', { target: login.find('button').get(0) })

    expect(handleChangeSpy.calledOnce).toBe(true)
    expect(validateNameSpy.calledOnce).toBe(true)
    expect(validateNameSpy.returnValues[0]).toBe(true)
    await expect(createUserMock).toHaveBeenCalled()
    expect(createUserMock).toHaveBeenCalledWith(testName)
    expect(logUserInMock).toHaveBeenCalledTimes(0)
    expect(showErrorSpy.calledOnceWith(USERNAME_TAKEN)).toBe(true)
  })

  it('Shows error for name with invalid pattern', async () => {
    login.find('input').simulate('change', { target: { value: testNameInvalidPattern } })
    login.find('button').simulate('submit', { target: login.find('button').get(0) })

    expect(handleChangeSpy.calledOnce).toBe(true)
    expect(validateNameSpy.calledOnce).toBe(true)
    expect(validateNameSpy.returnValues[0]).toBe(false)
    expect(showErrorSpy.calledOnceWith(USERNAME_INVALID_PATTERN)).toBe(true)
  })

  it('Shows error for name with invalid length', async () => {
    login.find('input').simulate('change', { target: { value: testNameInvalidLength } })
    login.find('button').simulate('submit', { target: login.find('button').get(0) })

    expect(handleChangeSpy.calledOnce).toBe(true)
    expect(validateNameSpy.calledOnce).toBe(true)
    expect(validateNameSpy.returnValues[0]).toBe(false)
    expect(showErrorSpy.calledOnceWith(USERNAME_INVALID_LENGTH)).toBe(true)
  })
})
