import React from 'react'
import renderer from 'react-test-renderer'
import ErrorMsg from 'components/ErrorMsg'

describe('Error message component snapshot', () => {
  it('renders the error message', () => {
    const tree = renderer.create(
      <ErrorMsg > Test error </ErrorMsg>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
