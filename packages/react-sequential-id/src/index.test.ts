import { render } from '@testing-library/react'
import { times } from 'ramda'
import { createElement as r } from 'react'
import uniqueid = require('uniqueid')

import { Consumer, IdProvider, SequentialId } from './'

describe('react-sequential-id', () => {
  describe('Consumer', () => {
    it('exposes the id factory function', () => {
      const callback = jest.fn()
      render(
        r(
          IdProvider,
          { factory: uniqueid('test') },
          r(Consumer, {
            children: (factory: () => string) => callback(factory()),
          }),
        ),
      )
      expect(callback.mock.calls[0][0]).toBe('test0')
    })
  })

  describe('IdProvider', () => {
    it('takes a factory prop', () => {
      const factory = uniqueid('test')
      const callback = jest.fn()
      render(
        r(
          IdProvider,
          { factory },
          r(SequentialId, { children: (id: string) => callback(id) }),
        ),
      )
      expect(callback.mock.calls[0][0]).toBe('test0')
    })
  })

  describe('SequentialId', () => {
    it('renders unique ids', () => {
      const callback = jest.fn()
      render(
        r(
          'div',
          {},
          r(SequentialId, { children: (id: string) => callback(id) }),
          r(SequentialId, { children: (id: string) => callback(id) }),
        ),
      )
      expect(callback.mock.calls[0][0]).not.toBe(callback.mock.calls[1][0])
    })

    it('renders the same every time', () => {
      const callback = jest.fn()
      times(
        () =>
          render(
            r(
              IdProvider,
              {},
              r(SequentialId, { children: (id: string) => callback(id) }),
            ),
          ),
        2,
      )
      expect(callback.mock.calls[0][0]).toBe(callback.mock.calls[1][0])
    })
  })
})
