import { configure, mount, render, shallow } from 'enzyme'
import Adapter = require('enzyme-adapter-react-16')
import { identity, mergeDeepRight } from 'ramda'
import { createElement as r } from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { Field, reducer, reduxForm } from 'redux-form'

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

function Form({ children, handleSubmit }) {
  return r('form', { onSubmit: handleSubmit }, children)
}

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

  it('submits the value when clicked with Redux Form', done => {
    const expected = { foo: true }
    const onSubmit = values => {
      expect(values).toEqual(expected)
      done()
    }
    const store = createStore(combineReducers({ form: reducer }))
    const wrapper = mount(
      r(
        Provider,
        { store },
        r(
          reduxForm({ form: 'form', initialValues: {} })(Form as any),
          { onSubmit },
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

  it('does not submit the value when not clicked with Redux Form', done => {
    const expected = {}
    const onSubmit = values => {
      expect(values).toEqual(expected)
      done()
    }
    const store = createStore(combineReducers({ form: reducer }))
    const wrapper = mount(
      r(
        Provider,
        { store },
        r(
          reduxForm({ form: 'form', initialValues: {} })(Form as any),
          { onSubmit },
          r(Field, { component: SubmitButton, name: 'foo' }),
        ),
      ),
      { attachTo: document.body },
    )
    wrapper.childAt(0).simulate('submit')
    wrapper.unmount()
  })
})
