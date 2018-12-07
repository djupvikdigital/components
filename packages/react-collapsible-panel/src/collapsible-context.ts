import { createContext } from 'react'

export interface CollapsibleContextValue {
  expanded: boolean
  toggle: () => void
}

function noop() {
  return
}

export const CollapsibleContext = createContext<CollapsibleContextValue>({
  expanded: false,
  toggle: noop,
})
