import { render, screen } from '@testing-library/react'
import { createElement as r, InputHTMLAttributes } from 'react'

import labeled from './'

describe('labeled', () => {
  test('takes a base component and returns a component taking a label', () => {
    const component = labeled('input')
    const labelText = 'Label'
    const wrapper = render(r(component, { label: labelText }))
    const label = wrapper.container.getElementsByTagName('label')[0]
    const input = wrapper.container.getElementsByTagName('input')[0]
    const parent = input.parentElement
    expect(parent && parent.nodeName.toLowerCase()).toBe('p')
    expect(label.nodeName.toLowerCase()).toBe('label')
    expect(label.textContent).toBe(labelText)
    expect(input.nodeName.toLowerCase()).toBe('input')
  })

  test('sets for and id attributes', () => {
    const component = labeled('input')
    const labelText = 'Label'
    const wrapper = render(r(component, { label: labelText }))
    const label = wrapper.container.getElementsByTagName('label')[0]
    const htmlFor = label.getAttribute('for')
    const input = wrapper.container.getElementsByTagName('input')[0]
    expect(htmlFor).toBeDefined()
    expect(htmlFor).toBe(input.getAttribute('id'))
  })

  test('renders children into label if label prop not provided', () => {
    const component = labeled('input')
    const labelText = 'Label'
    const wrapper = render(r(component, {}, labelText))
    const label = wrapper.container.getElementsByTagName('label')[0]
    expect(label.textContent).toBe(labelText)
  })

  test('sets hidden on the wrapper', () => {
    const component = labeled('input')
    const labelText = 'Label'
    render(
      r(component, {
        hidden: true,
        label: labelText,
      }),
    )
    const input = screen.getByLabelText(labelText)
    const parent = input.parentElement
    expect(parent && parent.hasAttribute('hidden')).toBe(true)
    expect(input.getAttribute('hidden')).toBeNull()
  })

  test('sets other props on the input', () => {
    const component = labeled<InputHTMLAttributes<any>>('input')
    const labelText = 'Label'
    const type = 'text'
    render(r(component, { type, label: labelText }))
    const input = screen.getByLabelText(labelText)
    expect(input.getAttribute('type')).toBe(type)
  })

  test('wraps the displayName of the wrapped component', () => {
    const component = labeled('input')
    expect(component.displayName).toBe('labeled(input)')
  })

  test('can render a component with children other than label', () => {
    const component = labeled('select')
    const labelText = 'Label'
    const wrapper = render(
      r(component, { label: labelText }, r('option', {}, 'Option')),
    )
    const label = wrapper.container.getElementsByTagName('label')[0]
    const select = screen.getByLabelText(labelText)
    expect(label.textContent).toBe(labelText)
    expect(select.innerHTML).toBe('<option>Option</option>')
  })

  test('will not render children as children if there is no label', () => {
    const component = labeled('select')
    const labelText = 'Label'
    const wrapper = render(r(component, {}, labelText))
    const label = wrapper.container.getElementsByTagName('label')[0]
    const select = screen.getByLabelText(labelText)
    expect(label.textContent).toBe(labelText)
    expect(select.innerHTML).toBe('')
  })

  test('supports rendering a custom form component', () => {
    const CustomInput = (props: { defaultValue: string; name: string }) =>
      r('span', { className: 'custom-input' }, r('input', props))
    const component =
      labeled<{ defaultValue: string; name: string }>(CustomInput)
    const labelText = 'Label'
    const name = 'name'
    const defaultValue = 'value'
    const wrapper = render(r(component, { defaultValue, name }, labelText))
    const label = wrapper.container.getElementsByTagName('label')[0]
    const span = wrapper.container.getElementsByClassName('custom-input')[0]
    const input = screen.getByLabelText(labelText)
    expect(label.textContent).toBe(labelText)
    expect(span.tagName.toLowerCase()).toBe('span')
    expect(input.getAttribute('name')).toBe(name)
    expect(input.getAttribute('value')).toBe(defaultValue)
  })
})
