import React from 'react'
import renderer from 'react-test-renderer'
import SubmitBar from 'components/SubmitBar'

describe('Submit bar component snapshot', () => {
  it('renders the submit bar', () => {
    const tree = renderer.create(
      <SubmitBar inputVal='testVal' 
        label='test label'
        error={true} errorMsg='test errorMsg' buttonText='Submit' />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
