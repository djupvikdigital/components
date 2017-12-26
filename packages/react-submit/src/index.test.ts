import { configure, render } from 'enzyme'
import Adapter = require('enzyme-adapter-react-16')
import { createElement as r } from 'react'

import SubmitButton from './'

configure({ adapter: new Adapter() })

describe('SubmitButton', () => {
  it('renders a submit button', () => {
    const buttonText = 'Button Text'
    const wrapper = render(r(SubmitButton, {}, buttonText))
    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attr('type')).toBe('submit')
    expect(wrapper.text()).toBe(buttonText)
  })
})
