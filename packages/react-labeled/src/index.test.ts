import { configure, render } from 'enzyme'
import Adapter = require('enzyme-adapter-react-16')
import { createElement as r } from 'react'

import labeled from './'

configure({ adapter: new Adapter() })

describe('labeled', () => {
  test('takes a base component and returns a component taking a label', () => {
    const component = labeled('input')
    const labelText = 'Label'
    const wrapper = render(r(component, { label: labelText }))
    const label = wrapper.children().eq(0)
    const input = wrapper.children().eq(1)
    expect(wrapper.is('p')).toBe(true)
    expect(label.is('label')).toBe(true)
    expect(label.text()).toBe(labelText)
    expect(input.is('input')).toBe(true)
  })

  test('sets for and id attributes', () => {
    const component = labeled('input')
    const labelText = 'Label'
    const wrapper = render(r(component, { label: labelText }))
    const label = wrapper.children().eq(0)
    const htmlFor = label.attr('for')
    const input = wrapper.children().eq(1)
    expect(htmlFor).toBeDefined()
    expect(htmlFor).toBe(input.attr('id'))
  })

  test('renders children into label if label prop not provided', () => {
    const component = labeled('input')
    const labelText = 'Label'
    const wrapper = render(r(component, {}, labelText))
    const label = wrapper.children().eq(0)
    expect(label.text()).toBe(labelText)
  })

  test('sets hidden on the wrapper', () => {
    const component = labeled('input')
    const labelText = 'Label'
    const wrapper = render(r(component, { hidden: true, label: labelText }))
    const input = wrapper.children().eq(1)
    expect(wrapper.attr('hidden')).toBe('hidden')
    expect(input.attr('hidden')).toBeUndefined()
  })
})