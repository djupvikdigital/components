import { configure, render, shallow } from 'enzyme'
import Adapter = require('enzyme-adapter-react-16')
import { times } from 'ramda'
import { createElement as r } from 'react'
import uniqueid = require('uniqueid')

import SequentialId, { createIdFactory, withIdFactory } from './'

configure({ adapter: new Adapter() })

describe('react-sequential-id', () => {
  describe('default', () => {
    test('renders unique ids', () => {
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

    test('has idFactory static method', () => {
      const ids = times(() => {
        SequentialId.idFactory = createIdFactory()
        return shallow(r(SequentialId, {}, (id: string) => r('div', {}, id)))
      }, 2).map(rendered =>
        rendered
          .at(0)
          .childAt(0)
          .text(),
      )
      expect(ids[0]).toBe(ids[1])
    })
  })

  describe('withIdFactory', () => {
    test(`takes a factory function and returns a component receiving a function
    child that gets an argument with a generated id`, () => {
      const factory = uniqueid('test')
      const Component = withIdFactory(factory)
      const rendered = shallow(
        r(Component, { children: (id: string) => r('div', {}, id) }),
      )
      expect(
        rendered
          .at(0)
          .childAt(0)
          .text(),
      ).toBe('test0')
    })
  })
})
