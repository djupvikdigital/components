import { ComponentClass, createElement as r, SFC } from 'react'
import SequentialId, { ISequentialIdProps } from 'react-sequential-id'
import { WrappedFieldProps } from 'redux-form'

export type Component<P> = string | ComponentClass<P> | SFC<P>

export interface IInputComponents {
  error: Component<any>
  input: Component<any>
  wrapper: Component<any>
}

export interface IInputProps {
  components: IInputComponents
}

export type InputProps = IInputProps & WrappedFieldProps

export { ISequentialIdProps }

function Input({ components: c = {}, input, meta, ...props }: InputProps) {
  const components: IInputComponents = {
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

export default Input
