import { render, screen } from '@testing-library/react'
import { mergeDeepRight } from 'ramda'
import { createElement as r, Fragment } from 'react'

import { InputFeedback, StateAndHelpers } from './'

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

describe('Input', () => {
  test('shows an error message', () => {
    const wrapper = render(
      r(
        'div',
        {},
        r(
          InputFeedback,
          createInputProps({ meta: { error: 'error', touched: true } }),
        ),
      ),
    )
    expect(wrapper.container.getElementsByTagName('span')[0].textContent).toBe(
      'error',
    )
  })

  test('sets aria-invalid to true when provided an error', () => {
    render(
      r(
        'div',
        {},
        r(
          InputFeedback,
          createInputProps({ meta: { error: 'error', touched: true } }),
        ),
      ),
    )
    expect(screen.getByRole('textbox').getAttribute('aria-invalid')).toBe(
      'true',
    )
  })

  test('sets aria-invalid to false when not provided an error', () => {
    render(
      r(
        'div',
        {},
        r(InputFeedback, createInputProps({ meta: { touched: true } })),
      ),
    )
    expect(screen.getByRole('textbox').getAttribute('aria-invalid')).toBe(
      'false',
    )
  })

  test('sets aria-invalid to false when not touched', () => {
    render(
      r(
        'div',
        {},
        r(
          InputFeedback,
          createInputProps({ meta: { error: 'error', touched: false } }),
        ),
      ),
    )
    expect(screen.getByRole('textbox').getAttribute('aria-invalid')).toBe(
      'false',
    )
  })

  test('sets aria-describedby and error component id', () => {
    const wrapper = render(
      r(
        'div',
        {},
        r(
          InputFeedback,
          createInputProps({ meta: { error: 'error', touched: true } }),
        ),
      ),
    )
    const describedby = screen
      .getByRole('textbox')
      .getAttribute('aria-describedby')
    expect(describedby).toBeDefined()
    expect(describedby).toBe(
      wrapper.container.getElementsByTagName('span')[0].getAttribute('id'),
    )
  })

  test('takes a function child for custom rendering', () => {
    const className = 'foo'
    render(
      r(
        'div',
        {},
        r(
          InputFeedback,
          createInputProps({
            children: customRender,
            className,
            meta: { error: 'error', touched: true },
          }),
        ),
      ),
    )
    const input = screen.getByRole('textbox')
    const errorElement = input.nextElementSibling
    const describedby = input.getAttribute('aria-describedby')
    expect(input.nodeName.toLowerCase()).toBe('textarea')
    expect(input.getAttribute('class')).toBe(className)
    expect(errorElement && errorElement.getAttribute('class')).toBe('bar')
    expect(describedby).toBeDefined()
    expect(describedby).toBe(errorElement && errorElement.getAttribute('id'))
  })

  test('provides the error when the field is touched', () => {
    const callback = jest.fn()
    const className = 'foo'
    const error = 'error'
    render(
      r(
        'div',
        {},
        r(
          InputFeedback,
          createInputProps({
            children: callback,
            className,
            meta: { error, touched: true },
          }),
        ),
      ),
    )
    expect(callback.mock.calls.length).toBe(1)
    expect(callback.mock.calls[0][0].error).toBe(error)
  })

  test('provides no error when the field is not touched', () => {
    const callback = jest.fn()
    const className = 'foo'
    const error = 'error'
    render(
      r(
        'div',
        {},
        r(
          InputFeedback,
          createInputProps({
            children: callback,
            className,
            meta: { error, touched: false },
          }),
        ),
      ),
    )
    expect(callback.mock.calls.length).toBe(1)
    expect(callback.mock.calls[0][0].error).toBeNull()
  })
})
