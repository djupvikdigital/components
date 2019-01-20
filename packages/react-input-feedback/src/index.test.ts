import { configure, render } from 'enzyme'
import Adapter = require('enzyme-adapter-react-16')
import { mergeDeepRight } from 'ramda'
import { createElement as r, Fragment } from 'react'

import Input, { StateAndHelpers } from './'

function noop() {
  return
}

function customRender({
  error,
  getErrorProps,
  getInputProps,
}: StateAndHelpers) {
  return r(
    Fragment,
    {},
    r('textarea', getInputProps()),
    r('div', getErrorProps({ className: 'bar' }), error),
  )
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

describe('Input', () => {
  test('shows an error message', () => {
    const wrapper = render(
      r(
        'div',
        {},
        r(Input, createInputProps({ meta: { error: 'error', touched: true } })),
      ),
    )
    expect(
      wrapper
        .children()
        .eq(1)
        .text(),
    ).toBe('error')
  })

  test('sets aria-invalid to true when provided an error', () => {
    const wrapper = render(
      r(
        'div',
        {},
        r(Input, createInputProps({ meta: { error: 'error', touched: true } })),
      ),
    )
    expect(
      wrapper
        .children()
        .eq(0)
        .attr('aria-invalid'),
    ).toBe('true')
  })

  test('sets aria-invalid to false when not provided an error', () => {
    const wrapper = render(
      r('div', {}, r(Input, createInputProps({ meta: { touched: true } }))),
    )
    expect(
      wrapper
        .children()
        .eq(0)
        .attr('aria-invalid'),
    ).toBe('false')
  })

  test('sets aria-invalid to false when not touched', () => {
    const wrapper = render(
      r(
        'div',
        {},
        r(
          Input,
          createInputProps({ meta: { error: 'error', touched: false } }),
        ),
      ),
    )
    expect(
      wrapper
        .children()
        .eq(0)
        .attr('aria-invalid'),
    ).toBe('false')
  })

  test('sets aria-describedby and error component id', () => {
    const wrapper = render(
      r(
        'div',
        {},
        r(Input, createInputProps({ meta: { error: 'error', touched: true } })),
      ),
    )
    const describedby = wrapper
      .children()
      .eq(0)
      .attr('aria-describedby')
    expect(describedby).toBeDefined()
    expect(describedby).toBe(
      wrapper
        .children()
        .eq(1)
        .attr('id'),
    )
  })

  test('takes a function child for custom rendering', () => {
    const className = 'foo'
    const wrapper = render(
      r(
        'div',
        {},
        r(
          Input,
          createInputProps({
            className,
            meta: { error: 'error', touched: true },
          }),
          customRender,
        ),
      ),
    )
    const input = wrapper.children().eq(0)
    const errorElement = wrapper.children().eq(1)
    const describedby = input.attr('aria-describedby')
    expect(input.is('textarea')).toBe(true)
    expect(input.attr('class')).toBe(className)
    expect(errorElement.attr('class')).toBe('bar')
    expect(describedby).toBeDefined()
    expect(describedby).toBe(errorElement.attr('id'))
  })
})
