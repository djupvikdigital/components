import {
  Component,
  ComponentClass,
  ComponentElement,
  ConsumerProps,
  createContext,
  createElement as r,
  ProviderProps,
  ReactNode,
  ReactPortal,
} from 'react'
import uniqueid = require('uniqueid')

export interface IIdProviderProps {
  children?: ReactNode
  factory?: () => string
}

export interface ISequentialIdProps {
  children?: (id: string) => ReactNode
}

export {
  Component,
  ComponentClass,
  ComponentElement,
  ConsumerProps,
  ProviderProps,
  ReactPortal,
}

const IdContext = createContext(createIdFactory())

export const { Consumer } = IdContext

export function IdProvider(props: IIdProviderProps) {
  const { children, factory = createIdFactory() } = props
  return r(IdContext.Provider, { value: factory }, children)
}

export function SequentialId({ children }: ISequentialIdProps) {
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
