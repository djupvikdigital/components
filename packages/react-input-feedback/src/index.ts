import {
  Component,
  ComponentElement,
  ComponentType,
  createElement as r,
  ReactElement,
  ReactPortal,
  SFCElement,
} from 'react'
import SequentialId, { ISequentialIdProps } from 'react-sequential-id'
import { WrappedFieldProps } from 'redux-form'

export interface IInputComponents {
  error?: ComponentType<any>
  input?: ComponentType<any>
  wrapper?: ComponentType<any>
}

export interface IInputProps {
  components?: IInputComponents
}

export type InputProps = IInputProps & WrappedFieldProps

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
