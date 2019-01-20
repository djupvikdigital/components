import { configure, render } from 'enzyme'
import Adapter = require('enzyme-adapter-react-16')
import { mergeDeepRight } from 'ramda'
import { createElement as r } from 'react'

import Input from './'

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
})
