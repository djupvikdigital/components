import {
  Component,
  ComponentElement,
  createContext,
  createElement as r,
  Props,
  ReactElement,
  ReactPortal,
  SFCElement,
} from 'react'
import uniqueid = require('uniqueid')

export interface IIdProviderProps {
  factory?: () => string
}

export interface ISequentialIdProps {
  children?: (id: string) => ReactElement<any> | null
}

export { Component, ComponentElement, ReactPortal, SFCElement }

const IdContext = createContext(createIdFactory())

export function IdProvider(props: IIdProviderProps & Props<{}>) {
  const { children, factory = createIdFactory() } = props
  return r(IdContext.Provider, { value: factory }, children)
}

function SequentialId(props: ISequentialIdProps) {
  const { children = () => null } = props
  if (typeof children !== 'function') {
    return null
  }
  return r(IdContext.Consumer, {}, (factory: () => string) =>
    children(factory()),
  )
}

export function createIdFactory() {
  return uniqueid('i')
}

export default SequentialId
