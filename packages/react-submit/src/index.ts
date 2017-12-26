import { createElement as r, DetailedReactHTMLElement, HTMLProps } from 'react'

export type ButtonProps = HTMLProps<HTMLButtonElement>

export default function SubmitButton(
  props: ButtonProps,
): DetailedReactHTMLElement<ButtonProps, HTMLButtonElement> {
  const { children } = props
  return r('button', { ...props, type: 'submit' }, children)
}
