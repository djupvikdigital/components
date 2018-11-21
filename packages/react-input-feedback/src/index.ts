import {
  Component,
  ComponentElement,
  ComponentType,
  createElement as r,
  ReactElement,
  ReactPortal,
  SFCElement,
} from 'react'
import { FieldRenderProps } from 'react-final-form'
import SequentialId, { ISequentialIdProps } from 'react-sequential-id'

export interface InputComponents {
  error?: ComponentType<any>
  input?: ComponentType<any>
  wrapper?: ComponentType<any>
}

export interface ComponentsProp {
  components?: InputComponents
}

export type InputProps = ComponentsProp & FieldRenderProps

export {
  Component,
  ComponentElement,
  ISequentialIdProps,
  ReactElement,
  ReactPortal,
  SFCElement,
}

export default function InputFeedback({
  components: c = {},
  input,
  meta = { error: null, touched: false },
  ...props
}: InputProps) {
  const components = {
    error: 'span',
    input: 'input',
    wrapper: 'span',
    ...c,
  }
  const { error, touched } = meta
  const showError = touched && !!error
  return r(SequentialId, {}, (errorId: string) =>
    r(
      components.wrapper,
      {},
      r(components.input, {
        'aria-describedby': showError ? errorId : null,
        'aria-invalid': showError,
        ...props,
        ...input,
      }),
      showError && r(components.error, { id: errorId }, error),
    ),
  )
}
