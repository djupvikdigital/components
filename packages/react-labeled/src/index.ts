import { AllHTMLAttributes, createElement as r, ReactNode, ReactType, SFC } from 'react'
import SequentialId from 'react-sequential-id'
import { wrapDisplayName } from 'recompose'

export interface ILabeledProps {
  component?: ReactType
  hidden?: boolean
  label?: ReactNode
}

export type LabeledProps<P> = ILabeledProps & P

export default function labeled(
  BaseComponent: ReactType<AllHTMLAttributes<any>>,
  LabelComponent: ReactType = 'label',
) {
  const LabeledComponent: SFC<any> = ({
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
