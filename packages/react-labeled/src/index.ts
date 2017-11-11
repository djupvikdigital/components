import {
  createElement as r,
  HTMLAttributes,
  ReactNode,
  ReactType,
  SFC,
} from 'react'
import SequentialId from 'react-sequential-id'
import { wrapDisplayName } from 'recompose'

export interface ILabeledProps<T> extends HTMLAttributes<T> {
  component?: ReactType
  label?: ReactNode
}

export type LabeledProps<P, T> = ILabeledProps<T> & P

export default function labeled(
  BaseComponent: ReactType,
  LabelComponent: ReactType = 'label',
) {
  const LabeledComponent: SFC<LabeledProps<any, any>> = ({
    children,
    component = 'p',
    hidden,
    label,
    ...props,
  }) =>
    r(SequentialId, {}, (id: string) =>
      r(
        component,
        { hidden },
        r(LabelComponent, { htmlFor: id }, label || children),
        r(BaseComponent, { id, ...props }),
      ),
    )
  LabeledComponent.displayName = wrapDisplayName(
    BaseComponent as any,
    'labeled',
  )
  return LabeledComponent
}
