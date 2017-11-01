import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createElement as r } from 'react'
import uniqueid from 'uniqueid'

import { withIdFactory } from './'

Enzyme.configure({ adapter: new Adapter() })

describe('withIdFactory', () => {
  test(`takes a factory function and returns a component receiving a function
    child that gets an argument with a generated id`, () => {
    const factory = uniqueid('test')
    const Component = withIdFactory(factory)
    const rendered = Enzyme.shallow(
      r(Component, { children: (id: string) => r('div', {}, id) }),
    )
    expect(rendered.at(0).childAt(0).text()).toBe('test0')
  })
})
