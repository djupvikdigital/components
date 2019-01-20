import {
  Component,
  ComponentElement,
  createElement as r,
  Fragment,
  ReactElement,
  ReactPortal,
  SFCElement,
} from 'react'
import { FieldRenderProps } from 'react-final-form'
import SequentialId, { ISequentialIdProps } from 'react-sequential-id'

export type InputProps = FieldRenderProps

export {
  Component,
  ComponentElement,
  ISequentialIdProps,
  ReactElement,
  ReactPortal,
  SFCElement,
}

export default function InputFeedback({
  input,
  meta = { error: null, touched: false },
  ...props
}: InputProps) {
  const { error, touched } = meta
  const showError = touched && !!error
  return r(SequentialId, {}, (errorId: string) =>
    r(
      Fragment,
      {},
      r('input', {
        'aria-describedby': showError ? errorId : null,
        'aria-invalid': showError,
        ...props,
        ...input,
      }),
      showError && r('span', { id: errorId }, error),
    ),
  )
}
