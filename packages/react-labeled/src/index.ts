import {
  createElement as r,
  ComponentType,
  FC,
  LabelHTMLAttributes,
  ReactNode,
} from 'react'
import SequentialId from 'react-sequential-id'
import { wrapDisplayName } from 'recompose'

interface WrapperProps {
  hidden?: boolean
}

export interface LabeledProps extends WrapperProps {
  children?: ReactNode
  component?: ComponentType<WrapperProps> | string
  label?: ReactNode
}

export default function labeled<P>(
  BaseComponent: ComponentType<Omit<P, keyof LabeledProps>> | string,
  LabelComponent: ComponentType<LabelHTMLAttributes<any>> | string = 'label',
): FC<LabeledProps & P> {
  const LabeledComponent: FC<LabeledProps & P> = ({
    children,
    component = 'p',
    hidden,
    label,
    ...props
  }) =>
    r(SequentialId, {
      children: (id: string) =>
        r(
          component,
          { hidden },
          r(LabelComponent, { htmlFor: id }, label || children),
          r(BaseComponent, { id, ...props }, label && children),
        ),
    })
  LabeledComponent.displayName = wrapDisplayName(
    BaseComponent as any,
    'labeled',
  )
  return LabeledComponent
}
