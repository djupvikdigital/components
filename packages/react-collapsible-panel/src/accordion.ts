import {
  Component,
  createContext,
  createElement as r,
  FunctionComponent,
} from 'react'

import { Collapsible } from './collapsible'

interface AccordionProps {
  expandedIndex?: number
  initialExpandedIndex?: number
  onToggle?: (expandedIndex: number) => void
}

interface AccordionState {
  expandedIndex: number
}

interface AccordionContextValue extends AccordionState {
  counterFactory: () => number
  toggle: (expandedIndex: number) => void
}

export const AccordionContext = createContext<AccordionContextValue>({
  counterFactory: createCounterFactory(),
  expandedIndex: 0,
  toggle: () => undefined,
})

const AccordionPanel: FunctionComponent = function AccordionPanel({
  children,
}) {
  return r(
    AccordionContext.Consumer as any,
    {},
    ({ counterFactory, expandedIndex, toggle }: AccordionContextValue) => {
      const index = counterFactory()
      return r(
        Collapsible,
        {
          expanded: index === expandedIndex,
          onToggle: (expanded: boolean) => toggle(expanded ? -1 : index),
        },
        children,
      )
    },
  )
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
          counterFactory: createCounterFactory(),
          expandedIndex,
          toggle: this.toggle,
        },
      },
      children,
    )
  }
}

function createCounterFactory(start = 0) {
  let counter = start
  return function counterFactory() {
    return counter++
  }
}

export { Accordion, AccordionPanel }
