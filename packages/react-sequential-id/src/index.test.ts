import { configure, render, shallow } from 'enzyme'
import Adapter = require('enzyme-adapter-react-16')
import { times } from 'ramda'
import { createElement as r } from 'react'
import uniqueid = require('uniqueid')

import { Consumer, IdProvider, SequentialId } from './'

configure({ adapter: new Adapter() })

describe('react-sequential-id', () => {
  describe('Consumer', () => {
    it('exposes the id factory function', () => {
      const rendered = render(
        r(
          IdProvider,
          { factory: uniqueid('test') },
          r(Consumer, {
            children: (factory: () => string) => r('div', {}, factory()),
          }),
        ),
      )
      expect(rendered.eq(0).text()).toBe('test0')
    })
  })

  describe('IdProvider', () => {
    it('takes a factory prop', () => {
      const factory = uniqueid('test')
      const rendered = render(
        r(
          IdProvider,
          { factory },
          r(SequentialId, {}, (id: string) => r('div', {}, id)),
        ),
      )
      expect(rendered.eq(0).text()).toBe('test0')
    })
  })

  describe('SequentialId', () => {
    it('renders unique ids', () => {
      const rendered = render(
        r(
          'div',
          {},
          r(SequentialId, {}, (id: string) => r('div', {}, id)),
          r(SequentialId, {}, (id: string) => r('div', {}, id)),
        ),
      )
      const children = rendered.eq(0).children()
      expect(children.eq(0).text()).not.toBe(children.eq(1).text())
    })

    it('renders the same every time', () => {
      const ids = times(
        () =>
          render(
            r(
              IdProvider,
              {},
              r(SequentialId, {}, (id: string) => r('div', {}, id)),
            ),
          ),
        2,
      ).map(rendered => rendered.eq(0).text())
      expect(ids[0]).toBe(ids[1])
    })
  })
})
