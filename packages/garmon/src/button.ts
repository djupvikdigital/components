import {
  ButtonHTMLAttributes,
  createElement as r,
  MouseEvent,
  ReactNode,
} from 'react'

import {
  CollapsibleContext,
  CollapsibleContextValue,
} from './collapsible-context'

type RenderCallback = (expanded: boolean) => ReactNode

export interface ButtonProps {
  children?: RenderCallback
  render?: RenderCallback
}

function Button({
  children,
  onClick,
  onKeyDown,
  render,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return r(CollapsibleContext.Consumer as any, {
    children: ({ expanded, toggle }: CollapsibleContextValue) =>
      r('button', {
        'aria-expanded': expanded,
        children: render
          ? render(expanded)
          : typeof children === 'function'
          ? children(expanded)
          : children,
        onClick: onClick
          ? (event: MouseEvent<HTMLButtonElement>) => {
              onClick(event)
              toggle()
            }
          : toggle,
        type: 'button',
        ...props,
      }),
  })
}

export { Button }
