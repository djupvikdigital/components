import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createElement as r } from 'react'

import { Accordion, AccordionItem, Body, Button, Collapsible } from './index'

describe('Accordion', () => {
  it('defaults to no panels being expanded', () => {
    render(
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
    const buttons = screen.getAllByRole('button')
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false')
    expect(buttons[1].getAttribute('aria-expanded')).toBe('false')
  })

  it('closes one panel when the other is expanded', async () => {
    render(
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
    const user = userEvent.setup()
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1])
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false')
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true')
  })

  it('allows the open panel to be collapsed, leaving none expanded', async () => {
    render(
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
    const user = userEvent.setup()
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false')
    expect(buttons[1].getAttribute('aria-expanded')).toBe('false')
  })

  it('takes an initialExpandedIndex prop', () => {
    render(
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
    const buttons = screen.getAllByRole('button')
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false')
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true')
  })

  it('does nothing when controlled with the expandedIndex prop', async () => {
    render(
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
    const user = userEvent.setup()
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1])
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true')
    expect(buttons[1].getAttribute('aria-expanded')).toBe('false')
  })

  it('takes an onToggle callback prop', async () => {
    const onToggle = jest.fn()
    render(
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
    const user = userEvent.setup()
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1])
    expect(onToggle.mock.calls.length).toBe(1)
    expect(onToggle.mock.calls[0][0]).toBe(1)
  })

  it('calls onToggle when controlled', async () => {
    const onToggle = jest.fn()
    render(
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
    const user = userEvent.setup()
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1])
    expect(onToggle.mock.calls.length).toBe(1)
    expect(onToggle.mock.calls[0][0]).toBe(1)
  })
})

describe('Body', () => {
  it('has the hidden attribute set when not expanded', () => {
    const wrapper = render(
      r(Collapsible, { initialExpanded: false }, r(Body, { className: 'foo' })),
    )
    const element = wrapper.container.getElementsByClassName('foo')[0]
    expect(element.hasAttribute('hidden')).toBe(true)
  })

  it('does not have the hidden attribute when expanded', () => {
    const wrapper = render(
      r(Collapsible, { initialExpanded: true }, r(Body, { className: 'foo' })),
    )
    expect(
      wrapper.container.getElementsByClassName('foo')[0].getAttribute('hidden'),
    ).toBeNull()
  })
})

describe('Button', () => {
  it('has the aria-expanded attribute set to false when not expanded', () => {
    render(r(Collapsible, { initialExpanded: false }, r(Button)))
    expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe(
      'false',
    )
  })

  it('has the aria-expanded attribute set to true when expanded', () => {
    render(r(Collapsible, { initialExpanded: true }, r(Button)))
    expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe(
      'true',
    )
  })

  it('sets the aria-expanded attribute to true on click when not expanded', async () => {
    render(r(Collapsible, { initialExpanded: false }, r(Button)))
    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('true')
  })

  it('sets the aria-expanded attribute to false on click when expanded', async () => {
    render(r(Collapsible, { initialExpanded: true }, r(Button)))
    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })
})

describe('Collapsible', () => {
  it('does nothing when controlled with the expanded prop', async () => {
    render(r(Collapsible, { expanded: false }, r(Button)))
    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })

  it('takes an onToggle callback prop', async () => {
    const onToggle = jest.fn()
    render(r(Collapsible, { onToggle }, r(Button)))
    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)
    expect(onToggle.mock.calls.length).toBe(1)
  })

  it('calls onToggle when controlled', async () => {
    const onToggle = jest.fn()
    render(r(Collapsible, { expanded: false, onToggle }, r(Button)))
    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)
    expect(onToggle.mock.calls.length).toBe(1)
  })
})
