import React from 'react'
import renderer from 'react-test-renderer'
import { shallow} from 'enzyme'
import Button from 'components/Button'

describe('Buttno component snapshot', () => {
  it('renders the button', () => {
    const tree = renderer.create(
      <Button id="submitBtn" > Test text </Button>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
