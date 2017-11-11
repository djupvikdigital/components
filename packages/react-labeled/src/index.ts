import { createElement as r, ReactNode, ReactType, SFC } from 'react'
import SequentialId from 'react-sequential-id'

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
    r(SequentialId, {}, (id: string) =>
      r(
        component,
        {},
        r(LabelComponent, { htmlFor: id }, label || children),
        r(BaseComponent, { id, ...props }),
      ),
    )
  return LabeledComponent
}
