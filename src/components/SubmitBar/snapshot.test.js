import React from 'react'
import renderer from 'react-test-renderer'
import SubmitBar from 'components/SubmitBar'

describe('Submit bar component snapshot', () => {
  const mockFn = jest.fn()

  it('renders the submit bar', () => {
    const tree = renderer.create(
      <SubmitBar
        buttonText='Submit'
        error
        errorMsg='test errorMsg'
        handleChange={mockFn}
        handleSubmit={mockFn}
        inputVal='testVal'
        label='test label'
        legend='test legend'
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
