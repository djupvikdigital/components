import { createElement as r, ReactNode, ReactType, SFC } from 'react'

export interface ILabeledProps {
  component?: ReactType
  label?: ReactNode
}

export default function labeled(
  BaseComponent: ReactType,
  LabelComponent = 'label',
) {
  const LabeledComponent: SFC<ILabeledProps> = ({
    children,
    component = 'p',
    label,
    ...props,
  }) =>
    r(
      component,
      {},
      r(LabelComponent, {}, label || children),
      r(BaseComponent, props),
    )
  return LabeledComponent
}
