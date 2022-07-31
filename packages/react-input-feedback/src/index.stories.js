import { storiesOf } from '@storybook/react'
import { createElement as r, Fragment } from 'react'
import { Client } from 'styletron-engine-atomic'
import { Provider, styled } from 'styletron-react'

import { InputFeedback } from './index.ts'

const styletron = new Client()

const colors = {
  brand: '#808080',
  error: 'red',
}

const StyledInput = styled('input', ({ 'aria-invalid': invalid }) => ({
  border: '1px solid #808080',
  outline: `2px solid ${invalid ? colors.error : 'transparent'}`,
  outlineOffset: '-2px',
  ':focus': {
    border: `1px solid ${colors.brand}`,
    outline: `2px solid ${invalid ? colors.error : colors.brand}`,
  },
}))

storiesOf('InputFeedback', module)
  .add('default', () => r(InputFeedback))
  .add('with error', () =>
    r(InputFeedback, { meta: { error: 'Error text', touched: true } }),
  )
  .add('styled', () =>
    r(
      Provider,
      { value: styletron },
      r(InputFeedback, {}, ({ getInputProps }) =>
        r(StyledInput, getInputProps()),
      ),
    ),
  )
  .add('styled with error', () =>
    r(
      Provider,
      { value: styletron },
      r(
        InputFeedback,
        {
          meta: { error: 'Error text', touched: true },
        },
        ({ error, getErrorProps, getInputProps }) =>
          r(
            Fragment,
            {},
            r(StyledInput, getInputProps()),
            r('span', getErrorProps(), error),
          ),
      ),
    ),
  )
