import { createElement as r, FunctionComponent, HTMLAttributes } from 'react'

import { Context, ContextValue } from './context'

export type BodyProps = HTMLAttributes<HTMLDivElement>

export const Body: FunctionComponent<BodyProps> = function Body(props) {
  return r(
    Context.Consumer as any,
    null,
    ({ expanded }: ContextValue) =>
      r('div', { hidden: !expanded, ...props }, props.children),
  )
}
