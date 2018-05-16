import {
  Component,
  ComponentClass,
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
  StatelessComponent,
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
  ComponentClass,
  ComponentElement,
  ConsumerProps,
  ProviderProps,
  ReactPortal,
  SFCElement,
  StatelessComponent,
}

const IdContext = createContext(createIdFactory())

export const { Consumer } = IdContext

export function IdProvider(props: IIdProviderProps & Props<{}>) {
  const { children, factory = createIdFactory() } = props
  return r(IdContext.Provider, { value: factory }, children)
}

export const SequentialId: SFC<ISequentialIdProps> = function SequentialId({
  children = () => null,
}) {
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
