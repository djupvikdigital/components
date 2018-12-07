import {
  Component,
  createContext,
  createElement as r,
  FunctionComponent,
} from 'react'

import { Panel } from './panel'

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
        Panel,
        {
          expanded: index === expandedIndex,
          onToggle: (expanded: boolean) => toggle(expanded ? 0 : index),
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
    this.state = { expandedIndex: initialExpandedIndex || 0 }
  }
  public toggle = (expandedIndex: number) => {
    const { props, state } = this
    const { onToggle } = props
    const isControlled = typeof props.expandedIndex !== 'undefined'
    if (isControlled) {
      if (typeof onToggle === 'function') {
        onToggle(expandedIndex)
      }
    } else {
      return this.setState(
        {
          expandedIndex:
            state.expandedIndex === expandedIndex ? -1 : expandedIndex,
        },
        () => typeof onToggle === 'function' && onToggle(expandedIndex),
      )
    }
  }
  public render() {
    const { children } = this.props
    const { expandedIndex } = this.state
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
