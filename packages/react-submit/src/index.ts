import * as React from 'react'
import { WrappedFieldProps } from 'redux-form'

export type ButtonProps = React.HTMLProps<HTMLButtonElement>
export type SubmitButtonProps = ButtonProps & WrappedFieldProps

const r = React.createElement

export default function SubmitButton({
  children,
  input = { name: '', onChange: null },
  meta,
  ...props
}: SubmitButtonProps) {
  const { name, onChange } = input
  const onClick = typeof onChange === 'function' ? () => onChange(true) : null
  return r('button', { ...props, name, onClick, type: 'submit' }, children)
}
