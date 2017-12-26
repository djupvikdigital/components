import { createElement as r, DetailedReactHTMLElement, HTMLProps } from 'react'
import { WrappedFieldProps } from 'redux-form'

export type ButtonProps = HTMLProps<HTMLButtonElement>
export type SubmitButtonProps = ButtonProps & WrappedFieldProps

function changeHandler(callback: any) {
  return typeof callback === 'function' ? callback : null
}

export default function SubmitButton(
  { children, input = { onChange: null }, ...props }: SubmitButtonProps,
): DetailedReactHTMLElement<ButtonProps, HTMLButtonElement> {
  const { onChange } = input
  const onClick = changeHandler(onChange)
  return r('button', { ...props, onClick, type: 'submit' }, children)
}
