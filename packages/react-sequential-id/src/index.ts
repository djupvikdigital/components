import { ReactElement, SFC, StatelessComponent } from 'react'
import uniqueid from 'uniqueid'

export interface ISequentialIdProps {
  children: (id: string) => ReactElement<any> | null
}

export type SequentialIdComponent = StatelessComponent<ISequentialIdProps>
export type SequentialIdSFC = SFC<ISequentialIdProps>

export function withIdFactory(factory: Function): SequentialIdSFC {
  return function SequentialId({ children }: ISequentialIdProps) {
    return children(factory())
  }
}

const DefaultComponent: SequentialIdComponent = withIdFactory(uniqueid('i'))

export default DefaultComponent
