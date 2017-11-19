import {
  createElement as r,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  ReactType,
  SFC,
} from 'react'
import SequentialId from 'react-sequential-id'
import { wrapDisplayName } from 'recompose'

export interface ILabeledProps {
  component?: ReactType
  hidden?: boolean
  label?: ReactNode
}

export type LabeledProps<P> = ILabeledProps & P

export default function labeled<P = {}>(
  BaseComponent: ReactType<P & HTMLAttributes<any>>,
  LabelComponent: ReactType<LabelHTMLAttributes<any>> = 'label',
): SFC<LabeledProps<P>> {
  const LabeledComponent: SFC<LabeledProps<P>> = ({
    children,
    component = 'p',
    hidden,
    label,
    ...props,
  }: any) =>
    r(SequentialId, {}, (id: string) =>
      r(
        component,
        { hidden },
        r(LabelComponent, { htmlFor: id }, label || children),
        r(BaseComponent, { id, ...props }, label && children),
      ),
    )
  LabeledComponent.displayName = wrapDisplayName(
    BaseComponent as any,
    'labeled',
  )
  return LabeledComponent
}
