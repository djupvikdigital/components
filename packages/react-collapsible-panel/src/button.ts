import { compose } from 'ramda'
import { ButtonHTMLAttributes, createElement as r, ReactNode, SFC } from 'react'

import { Context, ContextValue } from './context'

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
    Context.Consumer as any,
    null,
    ({ expanded, toggle }: ContextValue) =>
      r(
        'button',
        {
          'aria-expanded': expanded,
          onClick: onClick
            ? compose(
                toggle,
                onClick,
              )
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
