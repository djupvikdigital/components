import { createContext } from 'react'

export interface ContextValue {
  expanded: boolean
  toggle: () => void
}

function noop() {
  return
}

export const Context = createContext<ContextValue>({
  expanded: false,
  toggle: noop,
})
