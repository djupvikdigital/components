import { configure, mount, render } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { createElement as r } from 'react'

import { Accordion, AccordionItem, Body, Button, Collapsible } from './index'

configure({ adapter: new Adapter() })

describe('Accordion', () => {
  it('defaults to no panels being expanded', () => {
    const wrapper = render(
      r(
        'div',
        {},
        r(
          Accordion,
          {},
          r(AccordionItem, {}, r(Button)),
          r(AccordionItem, {}, r(Button)),
        ),
      ),
    )
    expect(
      wrapper
        .children()
        .eq(0)
        .attr('aria-expanded'),
    ).toBe('false')
    expect(
      wrapper
        .children()
        .eq(1)
        .attr('aria-expanded'),
    ).toBe('false')
  })

  it('closes one panel when the other is expanded', () => {
    const wrapper = mount(
      r(
        'div',
        {},
        r(
          Accordion,
          { initialExpandedIndex: 0 },
          r(AccordionItem, {}, r(Button)),
          r(AccordionItem, {}, r(Button)),
        ),
      ),
    )
    const div = wrapper.childAt(0)
    const second = div.childAt(1)
    second.simulate('click')
    expect(
      div
        .childAt(0)
        .getDOMNode()
        .getAttribute('aria-expanded'),
    ).toBe('false')
    expect(second.getDOMNode().getAttribute('aria-expanded')).toBe('true')
  })

  it('allows the open panel to be collapsed, leaving none expanded', () => {
    const wrapper = mount(
      r(
        'div',
        {},
        r(
          Accordion,
          { initialExpandedIndex: 0 },
          r(AccordionItem, {}, r(Button)),
          r(AccordionItem, {}, r(Button)),
        ),
      ),
    )
    const div = wrapper.childAt(0)
    const first = div.childAt(0)
    first.simulate('click')
    expect(first.getDOMNode().getAttribute('aria-expanded')).toBe('false')
    expect(
      div
        .childAt(1)
        .getDOMNode()
        .getAttribute('aria-expanded'),
    ).toBe('false')
  })

  it('takes an initialExpandedIndex prop', () => {
    const wrapper = render(
      r(
        'div',
        {},
        r(
          Accordion,
          { initialExpandedIndex: 1 },
          r(AccordionItem, {}, r(Button)),
          r(AccordionItem, {}, r(Button)),
        ),
      ),
    )
    expect(
      wrapper
        .children()
        .eq(0)
        .attr('aria-expanded'),
    ).toBe('false')
    expect(
      wrapper
        .children()
        .eq(1)
        .attr('aria-expanded'),
    ).toBe('true')
  })

  it('does nothing when controlled with the expandedIndex prop', () => {
    const wrapper = mount(
      r(
        'div',
        {},
        r(
          Accordion,
          { expandedIndex: 0 },
          r(AccordionItem, {}, r(Button)),
          r(AccordionItem, {}, r(Button)),
        ),
      ),
    )
    const div = wrapper.childAt(0)
    const second = div.childAt(1)
    second.simulate('click')
    expect(
      div
        .childAt(0)
        .getDOMNode()
        .getAttribute('aria-expanded'),
    ).toBe('true')
    expect(second.getDOMNode().getAttribute('aria-expanded')).toBe('false')
  })

  it('takes an onToggle callback prop', () => {
    const onToggle = jest.fn()
    const wrapper = mount(
      r(
        'div',
        {},
        r(
          Accordion,
          { expandedIndex: 0, onToggle },
          r(AccordionItem, {}, r(Button)),
          r(AccordionItem, {}, r(Button)),
        ),
      ),
    )
    const div = wrapper.childAt(0)
    const second = div.childAt(1)
    second.simulate('click')
    expect(onToggle.mock.calls.length).toBe(1)
    expect(onToggle.mock.calls[0][0]).toBe(1)
  })

  it('calls onToggle when controlled', () => {
    const onToggle = jest.fn()
    const wrapper = mount(
      r(
        'div',
        {},
        r(
          Accordion,
          { onToggle },
          r(AccordionItem, {}, r(Button)),
          r(AccordionItem, {}, r(Button)),
        ),
      ),
    )
    const div = wrapper.childAt(0)
    const second = div.childAt(1)
    second.simulate('click')
    expect(onToggle.mock.calls.length).toBe(1)
    expect(onToggle.mock.calls[0][0]).toBe(1)
  })
})

describe('Body', () => {
  it('has the hidden attribute set when not expanded', () => {
    const wrapper = render(r(Collapsible, { initialExpanded: false }, r(Body)))
    expect(wrapper.attr('hidden')).toBe('hidden')
  })

  it('does not have the hidden attribute when expanded', () => {
    const wrapper = render(r(Collapsible, { initialExpanded: true }, r(Body)))
    expect(wrapper.attr('hidden')).toBeUndefined()
  })
})

describe('Button', () => {
  it('has the aria-expanded attribute set to false when not expanded', () => {
    const wrapper = render(
      r(Collapsible, { initialExpanded: false }, r(Button)),
    )
    expect(wrapper.attr('aria-expanded')).toBe('false')
  })

  it('has the aria-expanded attribute set to true when expanded', () => {
    const wrapper = render(r(Collapsible, { initialExpanded: true }, r(Button)))
    expect(wrapper.attr('aria-expanded')).toBe('true')
  })

  it('sets the aria-expanded attribute to true on click when not expanded', () => {
    const wrapper = mount(r(Collapsible, { initialExpanded: false }, r(Button)))
    wrapper.simulate('click')
    expect(
      wrapper
        .childAt(0)
        .getDOMNode()
        .getAttribute('aria-expanded'),
    ).toBe('true')
  })

  it('sets the aria-expanded attribute to false on click when expanded', () => {
    const wrapper = mount(r(Collapsible, { initialExpanded: true }, r(Button)))
    wrapper.simulate('click')
    expect(
      wrapper
        .childAt(0)
        .getDOMNode()
        .getAttribute('aria-expanded'),
    ).toBe('false')
  })
})

describe('Collapsible', () => {
  it('does nothing when controlled with the expanded prop', () => {
    const wrapper = mount(r(Collapsible, { expanded: false }, r(Button)))
    wrapper.simulate('click')
    expect(
      wrapper
        .childAt(0)
        .getDOMNode()
        .getAttribute('aria-expanded'),
    ).toBe('false')
  })

  it('takes an onToggle callback prop', () => {
    const onToggle = jest.fn()
    const wrapper = mount(r(Collapsible, { onToggle }, r(Button)))
    wrapper.simulate('click')
    expect(onToggle.mock.calls.length).toBe(1)
  })

  it('calls onToggle when controlled', () => {
    const onToggle = jest.fn()
    const wrapper = mount(
      r(Collapsible, { expanded: false, onToggle }, r(Button)),
    )
    wrapper.simulate('click')
    expect(onToggle.mock.calls.length).toBe(1)
  })
})
