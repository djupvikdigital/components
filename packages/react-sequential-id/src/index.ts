import {
  Component,
  ComponentElement,
  ConsumerProps,
  createContext,
  createElement as r,
  Props,
  ProviderProps,
  ReactElement,
  ReactPortal,
  SFC,
  SFCElement,
} from 'react'
import uniqueid = require('uniqueid')

export interface IIdProviderProps {
  factory?: () => string
}

export interface ISequentialIdProps {
  children?: (id: string) => ReactElement<any> | null
}

export {
  Component,
  ComponentElement,
  ConsumerProps,
  ProviderProps,
  ReactPortal,
  SFCElement,
}

const IdContext = createContext(createIdFactory())

export function IdProvider(props: IIdProviderProps & Props<{}>) {
  const { children, factory = createIdFactory() } = props
  return r(IdContext.Provider, { value: factory }, children)
}

export const SequentialId: SFC<ISequentialIdProps> = props => {
  const { children = () => null } = props
  if (typeof children !== 'function') {
    return null
  }
  return r(IdContext.Consumer, {
    children: (factory: () => string) => children(factory()),
  })
}

export function createIdFactory() {
  return uniqueid('i')
}

export default SequentialId
