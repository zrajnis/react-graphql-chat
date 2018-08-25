import React from 'react'
import renderer from 'react-test-renderer'
import Login from 'containers/Login'

describe('Login container snapshot', () => {
  const mockFn = jest.fn()

  it('renders the login container', () => {
    const tree = renderer.create(
      <Login
        createUser={mockFn}
        logUserIn={mockFn}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
