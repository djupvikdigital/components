import { configure, mount, render, shallow } from 'enzyme'
import Adapter = require('enzyme-adapter-react-16')
import { mergeDeepRight } from 'ramda'
import { createElement as r } from 'react'
import { Field, Form, FormRenderProps } from 'react-final-form'

import SubmitButton from './'

function noop() {
  return
}

const createInputProps = mergeDeepRight({
  input: {
    name: 'input',
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    value: '',
  },
  meta: {},
})

configure({ adapter: new Adapter() })

describe('SubmitButton', () => {
  it('renders a submit button', () => {
    const buttonText = 'Button Text'
    const wrapper = render(r(SubmitButton, createInputProps({}), buttonText))
    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.attr('type')).toBe('submit')
    expect(wrapper.text()).toBe(buttonText)
  })

  it('adds the name of the input prop to the button', () => {
    const name = 'foo'
    const wrapper = render(
      r(SubmitButton, createInputProps({ input: { name } })),
    )
    expect(wrapper.attr('name')).toBe(name)
  })

  it('takes an onChange prop with a callback function', () => {
    const onChange = jest.fn()
    const wrapper = shallow(
      r(SubmitButton, createInputProps({ input: { onChange } })),
    )
    wrapper.simulate('click')
    expect(onChange.mock.calls.length).toBe(1)
  })

  it('submits the value when clicked with React Final Form', done => {
    const expected = { foo: true }
    const onSubmit = (values: {}) => {
      expect(values).toEqual(expected)
      done()
    }
    const wrapper = mount(
      r(Form, { onSubmit }, ({ handleSubmit }: FormRenderProps) =>
        r(
          'form',
          { onSubmit: handleSubmit },
          r(Field, { component: SubmitButton, name: 'foo' }),
        ),
      ),
      { attachTo: document.body },
    )
    const event = document.createEvent('HTMLEvents')
    event.initEvent('click', true, true)
    wrapper
      .find('button')
      .getDOMNode()
      .dispatchEvent(event)
    wrapper.unmount()
  })

  it('does not submit the value when not clicked with React Final Form', done => {
    const expected = {}
    const onSubmit = (values: {}) => {
      expect(values).toEqual(expected)
      done()
    }
    const wrapper = mount(
      r(Form, { onSubmit }, ({ handleSubmit }: FormRenderProps) =>
        r(
          'form',
          { onSubmit: handleSubmit },
          r(Field, { component: SubmitButton, name: 'foo' }),
        ),
      ),
      { attachTo: document.body },
    )
    wrapper.childAt(0).simulate('submit')
    wrapper.unmount()
  })
})
