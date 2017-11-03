import { configure, render } from 'enzyme'
import Adapter = require('enzyme-adapter-react-16')
import { createElement as r } from 'react'

import Input from './'

configure({ adapter: new Adapter() })

describe('Input', () => {
  test('shows an error message', () => {
    const wrapper = render(
      r(Input, {
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
          error: 'error',
          form: null,
          initial: null,
          invalid: null,
          pristine: null,
          submitFailed: null,
          submitting: null,
          touched: true,
          valid: null,
          visited: null,
        },
      }),
    )
    expect(wrapper.children().eq(1).text()).toBe('error')
  })
})
