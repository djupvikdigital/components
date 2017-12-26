import { configure, render, shallow } from 'enzyme'
import Adapter = require('enzyme-adapter-react-16')
import { mergeDeepRight } from 'ramda'
import { createElement as r } from 'react'

import SubmitButton from './'

const createInputProps = mergeDeepRight({
  input: {
    name: 'input',
    onBlur: null,
    onChange: null,
    onDragStart: null,
    onDrop: null,
    onFocus: null,
    value: '',
  },
  meta: {
    asyncValidating: null,
    autofilled: null,
    dirty: null,
    dispatch: null,
    error: null,
    form: null,
    initial: null,
    invalid: null,
    pristine: null,
    submitFailed: null,
    submitting: null,
    touched: null,
    valid: null,
    visited: null,
  },
})

configure({ adapter: new Adapter() })

describe('SubmitButton', () => {
  it('renders a submit button', () => {
    const buttonText = 'Button Text'
    const wrapper = render(r(SubmitButton, {}, buttonText))
    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attr('type')).toBe('submit')
    expect(wrapper.text()).toBe(buttonText)
  })

  it('takes an onChange prop with a callback function', () => {
    const onChange = jest.fn()
    const wrapper = shallow(
      r(SubmitButton, createInputProps({ input: { onChange } })),
    )
    wrapper.simulate('click')
    expect(onChange.mock.calls.length).toBe(1)
  })
})
