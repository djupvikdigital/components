import { createContext } from 'react'

import { createNumberFactory } from './create-number-factory'

export interface AccordionContextValue {
  expandedIndex: number
  numberFactory: () => number
  toggle: (expandedIndex: number) => void
}

export const AccordionContext = createContext<AccordionContextValue>({
  expandedIndex: 0,
  numberFactory: createNumberFactory(),
  toggle: () => undefined,
})
