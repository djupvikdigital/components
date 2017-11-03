import { ComponentClass, createElement as r, SFC } from 'react'
import { WrappedFieldProps } from 'redux-form'

export type Component<P> = string | ComponentClass<P> | SFC<P>

export interface IInputProps extends WrappedFieldProps {
  components: {
    error: Component<any>
    input: Component<any>
    wrapper: Component<any>
  }
}

export default function Input({
  components,
  input,
  meta,
  ...props,
}: IInputProps) {
  const { error, touched } = meta
  const showError = touched && !!error
  return r(
    components.wrapper,
    {},
    r(components.input, { ...props, ...input }),
    showError && r(components.error),
  )
}
