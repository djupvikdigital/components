import { storiesOf } from '@storybook/react'
import { createElement as r } from 'react'

import Input from './test.ts'

storiesOf('InputFeedback', module).add('default', () => r(Input))
