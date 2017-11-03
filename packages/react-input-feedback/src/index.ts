import { defaultTo, lensProp, merge, over, pipe } from 'ramda'
import { ComponentClass, createElement as r, SFC } from 'react'
import { mapProps } from 'recompose'
import { WrappedFieldProps } from 'redux-form'

export type Component<P> = string | ComponentClass<P> | SFC<P>

export interface IInputProps {
  components: {
    error: Component<any>
    input: Component<any>
    wrapper: Component<any>
  }
}

export type InputProps = IInputProps & WrappedFieldProps
export type PartialInputProps = Partial<IInputProps> & WrappedFieldProps

function Input({ components, input, meta, ...props }: InputProps) {
  const { error, touched } = meta
  const showError = touched && !!error
  return r(
    components.wrapper,
    {},
    r(components.input, { ...props, ...input }),
    showError && r(components.error),
  )
}

const withDefaultComponents: (
  component: Component<InputProps>,
) => Component<PartialInputProps> = mapProps(
  over(
    lensProp('components'),
    pipe(
      defaultTo({}),
      merge({ error: 'span', input: 'input', wrapper: 'span' }),
    ),
  ),
)

export default withDefaultComponents(Input)
