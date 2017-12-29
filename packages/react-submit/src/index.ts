import * as React from 'react'
import { WrappedFieldProps } from 'redux-form'

export type ButtonProps = React.HTMLProps<HTMLButtonElement>
export type SubmitButtonProps = ButtonProps & WrappedFieldProps

const r = React.createElement

export default function SubmitButton({
  children,
  input = { onChange: null },
  meta,
  ...props
}: SubmitButtonProps) {
  const { onChange } = input
  const onClick = typeof onChange === 'function' ? () => onChange(true) : null
  return r('button', { ...props, onClick, type: 'submit' }, children)
}
