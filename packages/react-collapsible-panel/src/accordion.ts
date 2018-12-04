import {
  Component,
  createContext,
  createElement as r,
  FunctionComponent,
} from 'react'

import { Panel } from './panel'

interface AccordionState {
  expandedIndex: number
}

interface AccordionContextValue extends AccordionState {
  counterFactory: () => number
}

export const AccordionContext = createContext<AccordionContextValue>({
  counterFactory: createCounterFactory(),
  expandedIndex: 0,
})

const AccordionPanel: FunctionComponent = function AccordionPanel({
  children,
}) {
  return r(
    AccordionContext.Consumer as any,
    {},
    ({ counterFactory, expandedIndex }: AccordionContextValue) =>
      r(Panel, { expanded: counterFactory() === expandedIndex }, children),
  )
}

class Accordion extends Component<{}, AccordionState> {
  public state = {
    expandedIndex: 0,
  }
  public render() {
    const { children } = this.props
    const { expandedIndex } = this.state
    return r(
      AccordionContext.Provider,
      { value: { counterFactory: createCounterFactory(), expandedIndex } },
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
