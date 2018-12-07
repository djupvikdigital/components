import { createElement as r, FunctionComponent } from 'react'

import { AccordionContext, AccordionContextValue } from './accordion-context'
import { Collapsible } from './collapsible'

const AccordionItem: FunctionComponent = function AccordionItem({ children }) {
  return r(
    AccordionContext.Consumer as any,
    {},
    ({ numberFactory, expandedIndex, toggle }: AccordionContextValue) => {
      const index = numberFactory()
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

export { AccordionItem }
