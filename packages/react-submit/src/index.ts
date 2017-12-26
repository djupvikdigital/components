import { createElement as r, DetailedReactHTMLElement, HTMLProps } from 'react'

export default function SubmitButton(
  props: HTMLProps<HTMLButtonElement>,
): DetailedReactHTMLElement<{}, HTMLElement> {
  const { children } = props
  return r('button', props, children)
}
