import { storiesOf } from '@storybook/react'
import { createElement as r } from 'react'

import Input from './index.ts'

storiesOf('InputFeedback', module)
  .add('default', () => r(Input))
  .add('with error', () =>
    r(Input, { meta: { error: 'Error text', touched: true } }),
  )
