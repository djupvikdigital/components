import {
  Component,
  ComponentElement,
  createElement as r,
  FC,
  Fragment,
  ReactElement,
  ReactNode,
  ReactPortal,
  SFCElement,
} from 'react'
import { FieldRenderProps } from 'react-final-form'
import SequentialId, { ISequentialIdProps } from 'react-sequential-id'

export interface ErrorProps {
  id: string
}

export interface InputProps {
  'aria-describedby': string | null
  'aria-invalid': boolean
}

export interface PropGetters {
  getErrorProps: (options?: object) => ErrorProps
  getInputProps: (options?: object) => InputProps
}

export interface State {
  error: any
}

export type StateAndHelpers = PropGetters & State

export type RenderCallback = (stateAndHelpers: StateAndHelpers) => ReactNode

export interface InputFeedbackProps extends FieldRenderProps {
  children?: RenderCallback
  render?: RenderCallback
}

export {
  Component,
  ComponentElement,
  ISequentialIdProps,
  ReactElement,
  ReactPortal,
  SFCElement,
}

function getErrorProps(errorId: string) {
  return (options = {}) => ({ ...options, id: errorId })
}

function getInputProps(showError: boolean, errorId: string, props: object) {
  return (options = {}) => ({
    ...props,
    ...options,
    'aria-describedby': showError ? errorId : null,
    'aria-invalid': showError,
  })
}

const InputFeedback: FC<InputFeedbackProps> = function InputFeedback({
  children,
  input,
  meta = { error: null, touched: false },
  render,
  ...props
}) {
  const inputProps = { ...props, ...input }
  const { error, touched } = meta
  const showError = Boolean(touched && !!error)
  return r(SequentialId, {}, (errorId: string) => {
    const options = {
      error,
      getErrorProps: getErrorProps(errorId),
      getInputProps: getInputProps(showError, errorId, inputProps),
    }
    if (typeof render === 'function') {
      return render(options)
    }
    if (typeof children === 'function') {
      return children(options)
    }
    return r(
      Fragment,
      {},
      r('input', options.getInputProps()),
      showError && r('span', options.getErrorProps(), error),
    )
  })
}

export default InputFeedback
