import * as React from 'react'
import { WrappedFieldProps } from 'redux-form'

export interface ISubmitButtonProps {
  component: string
}

export type ButtonProps = React.HTMLProps<HTMLButtonElement>
export type SubmitButtonProps = ButtonProps &
  ISubmitButtonProps &
  WrappedFieldProps

const r = React.createElement

export default function SubmitButton({
  children,
  component = 'button',
  input = { name: '', onChange: null },
  meta,
  ...props
}: SubmitButtonProps) {
  const { name, onChange } = input
  const onClick = typeof onChange === 'function' ? () => onChange(true) : null
  return r(component, { ...props, name, onClick, type: 'submit' }, children)
}
