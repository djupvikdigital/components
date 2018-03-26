import { Component, ReactElement, ReactPortal } from 'react'
import uniqueid = require('uniqueid')

export interface ISequentialIdProps {
  children?: (id: string) => ReactElement<any> | null
}

export { ReactPortal }

export function withIdFactory(factory: () => string) {
  return class SequentialId extends Component<ISequentialIdProps> {
    public static idFactory = factory
    public render() {
      const { children = () => null } = this.props
      if (typeof children !== 'function') {
        return null
      }
      return children(SequentialId.idFactory())
    }
  }
}

export function createIdFactory() {
  return uniqueid('i')
}

const DefaultComponent = withIdFactory(createIdFactory())

export default DefaultComponent
