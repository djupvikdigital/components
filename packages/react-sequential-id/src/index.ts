import { ReactElement, SFC } from 'react'
import uniqueid = require('uniqueid')

export interface ISequentialIdProps {
  children: (id: string) => ReactElement<any> | null
}

export type SequentialIdSFC = SFC<ISequentialIdProps>

export function withIdFactory(factory: () => string): SequentialIdSFC {
  return function SequentialId({ children }: ISequentialIdProps) {
    return children(factory())
  }
}

const DefaultComponent: SequentialIdSFC = withIdFactory(uniqueid('i'))

export default DefaultComponent
