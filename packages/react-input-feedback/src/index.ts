import { createElement as r, Fragment, ReactNode, useId } from 'react'
import { FieldRenderProps } from 'react-final-form'

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

export interface InputFeedbackProps
  extends FieldRenderProps<string, HTMLInputElement> {
  children?: RenderCallback
  render?: RenderCallback
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

export function InputFeedback({
  children,
  input,
  meta = { error: null, touched: false },
  render,
  ...props
}: InputFeedbackProps) {
  const errorId = useId()
  const inputProps = { ...props, ...input }
  const { error, touched } = meta
  const showError = Boolean(touched && !!error)
  const options = {
    error: showError ? error : null,
    getErrorProps: getErrorProps(errorId),
    getInputProps: getInputProps(showError, errorId, inputProps),
  }
  if (typeof render === 'function') {
    return r(Fragment, {}, render(options))
  }
  if (typeof children === 'function') {
    return r(Fragment, {}, children(options))
  }
  return r(
    Fragment,
    {},
    r('input', options.getInputProps()),
    showError && r('span', options.getErrorProps(), error),
  )
}
