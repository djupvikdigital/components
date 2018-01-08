import { ReactElement, SFC } from 'react'
import uniqueid = require('uniqueid')

export interface ISequentialIdProps {
  children?: (id: string) => ReactElement<any> | null
}

export type SequentialIdSFC = SFC<ISequentialIdProps>

export function withIdFactory(factory: () => string): SequentialIdSFC {
  return function SequentialId(props: ISequentialIdProps) {
    const { children = () => null } = props
    return children(factory())
  }
}

export const defaultIdFactory = uniqueid('i')

const DefaultComponent: SequentialIdSFC = withIdFactory(defaultIdFactory)

export default DefaultComponent
