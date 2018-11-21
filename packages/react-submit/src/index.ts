import * as React from 'react'
import { FieldRenderProps } from 'react-final-form'

export interface ComponentProp {
  component?: string
}

export type ButtonProps = React.HTMLProps<HTMLButtonElement>
export type SubmitButtonProps = ButtonProps & ComponentProp &
  FieldRenderProps

const r = React.createElement

export default function SubmitButton({
  children,
  component = 'button',
  input,
  meta,
  ...props
}: SubmitButtonProps) {
  const { name, onChange } = input
  const onClick = typeof onChange === 'function' ? () => onChange(true) : null
  return r(component, { ...props, name, onClick, type: 'submit' }, children)
}
