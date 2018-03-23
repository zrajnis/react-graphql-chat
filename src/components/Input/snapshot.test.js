import React from 'react'
import renderer from 'react-test-renderer'
import Input from 'components/Input'

describe('Input component snapshot', () => {
  it('renders the input', () => {
    const tree = renderer.create(
      <Input id="textField" label="test label" type="text" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
