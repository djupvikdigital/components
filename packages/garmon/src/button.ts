import {
  ButtonHTMLAttributes,
  createElement as r,
  MouseEvent,
  ReactNode,
  SFC,
} from 'react'

import {
  CollapsibleContext,
  CollapsibleContextValue,
} from './collapsible-context'

type RenderCallback = (expanded: boolean) => ReactNode

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: RenderCallback
  render?: RenderCallback
}

const Button: SFC<ButtonProps> = function Button({
  children,
  onClick,
  onKeyDown,
  render,
  ...props
}) {
  return r(
    CollapsibleContext.Consumer as any,
    null,
    ({ expanded, toggle }: CollapsibleContextValue) =>
      r(
        'button',
        {
          'aria-expanded': expanded,
          onClick: onClick
            ? (event: MouseEvent<HTMLButtonElement>) => {
                onClick(event)
                toggle()
              }
            : toggle,
          type: 'button',
          ...props,
        },
        render
          ? render(expanded)
          : typeof children === 'function'
          ? children(expanded)
          : children,
      ),
  )
}

export { Button }
