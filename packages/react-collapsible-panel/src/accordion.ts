import { Component, createElement as r } from 'react'

import { AccordionContext } from './accordion-context'
import { createNumberFactory } from './create-number-factory'

interface AccordionProps {
  expandedIndex?: number
  initialExpandedIndex?: number
  onToggle?: (expandedIndex: number) => void
}

interface AccordionState {
  expandedIndex: number
}

class Accordion extends Component<AccordionProps, AccordionState> {
  constructor(props: AccordionProps) {
    super(props)
    const { initialExpandedIndex } = props
    this.state = {
      expandedIndex:
        typeof initialExpandedIndex !== 'undefined' ? initialExpandedIndex : -1,
    }
  }
  public toggle = (expandedIndex: number) => {
    const { props } = this
    const { onToggle } = props
    const isControlled = typeof props.expandedIndex !== 'undefined'
    if (isControlled) {
      if (typeof onToggle === 'function') {
        onToggle(expandedIndex)
      }
    } else {
      return this.setState(
        { expandedIndex },
        () => typeof onToggle === 'function' && onToggle(expandedIndex),
      )
    }
  }
  public render() {
    const { props, state } = this
    const { children } = props
    const isControlled = typeof props.expandedIndex !== 'undefined'
    const expandedIndex = Number(
      isControlled ? props.expandedIndex : state.expandedIndex,
    )
    return r(
      AccordionContext.Provider,
      {
        value: {
          expandedIndex,
          numberFactory: createNumberFactory(),
          toggle: this.toggle,
        },
      },
      children,
    )
  }
}

export { Accordion }
