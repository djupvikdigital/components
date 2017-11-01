import { configure, shallow } from 'enzyme'
import Adapter = require('enzyme-adapter-react-16')
import { createElement as r } from 'react'
import uniqueid = require('uniqueid')

import { withIdFactory } from './'

configure({ adapter: new Adapter() })

describe('withIdFactory', () => {
  test(`takes a factory function and returns a component receiving a function
    child that gets an argument with a generated id`, () => {
    const factory = uniqueid('test')
    const Component = withIdFactory(factory)
    const rendered = shallow(
      r(Component, { children: (id: string) => r('div', {}, id) }),
    )
    expect(rendered.at(0).childAt(0).text()).toBe('test0')
  })
})
