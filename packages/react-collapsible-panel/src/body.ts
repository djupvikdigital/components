import { createElement as r, FunctionComponent, HTMLAttributes } from 'react'

import {
  CollapsibleContext,
  CollapsibleContextValue,
} from './collapsible-context'

export type BodyProps = HTMLAttributes<HTMLDivElement>

export const Body: FunctionComponent<BodyProps> = function Body(props) {
  return r(
    CollapsibleContext.Consumer as any,
    null,
    ({ expanded }: CollapsibleContextValue) =>
      r('div', { hidden: !expanded, ...props }, props.children),
  )
}
