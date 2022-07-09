import { fireEvent, screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mergeDeepRight } from 'ramda'
import { createElement as r } from 'react'
import { Field, Form } from 'react-final-form'

import SubmitButton from './'

interface Values {
  foo?: true
}

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

describe('SubmitButton', () => {
  it('renders a submit button', () => {
    const buttonText = 'Button Text'
    render(r(SubmitButton, createInputProps({}), buttonText))
    const element = screen.getByText(buttonText)
    expect(element.nodeName.toLowerCase()).toBe('button')
    expect(element.getAttribute('type')).toBe('submit')
  })

  it('adds the name of the input prop to the button', () => {
    const name = 'foo'
    render(
      r(SubmitButton, createInputProps({ input: { name } })),
    )
    const element = screen.getByRole('button')
    expect(element.getAttribute('name')).toBe(name)
  })

  it('takes an onChange prop with a callback function', async () => {
    const onChange = jest.fn()
    render(
      r(SubmitButton, createInputProps({ input: { onChange } })),
    )
    const element = screen.getByRole('button')
    const user = userEvent.setup()
    await user.click(element)
    expect(onChange.mock.calls.length).toBe(1)
  })

  it('submits the value when clicked with React Final Form', async () => {
    const expected = { foo: true }
    const onSubmit = (values: Values) => {
      expect(values).toEqual(expected)
    }
    render(
      r(Form<Values>, {
        children: ({ handleSubmit }) =>
          r(
            'form',
            { onSubmit: handleSubmit },
            r(Field<string>, { component: SubmitButton, name: 'foo' }),
          ),
        onSubmit,
      }),
    )
    const element = screen.getByRole('button')
    const user = userEvent.setup()
    await user.click(element)
  })

  it('does not submit the value when not clicked with React Final Form', (done) => {
    const expected = {}
    const onSubmit = (values: {}) => {
      expect(values).toEqual(expected)
      done()
    }
    const wrapper = render(
      r(Form<Values>, {
        children: ({ handleSubmit }) =>
          r(
            'form',
            { onSubmit: handleSubmit },
            r(Field<string>, { component: SubmitButton, name: 'foo' }),
          ),
        onSubmit
      }),
    )
    const element = wrapper.container.getElementsByTagName('form')[0]
    fireEvent.submit(element)
  })
})
