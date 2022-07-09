import { createElement as r, PropsWithChildren } from 'react'

import { AccordionContext, AccordionContextValue } from './accordion-context'
import { Collapsible } from './collapsible'

function AccordionItem({ children }: PropsWithChildren<{}>) {
  return r(AccordionContext.Consumer as any, {
    children: ({
      numberFactory,
      expandedIndex,
      toggle,
    }: AccordionContextValue) => {
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
  })
}

export { AccordionItem }
