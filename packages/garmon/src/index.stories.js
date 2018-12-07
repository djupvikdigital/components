import { storiesOf } from '@storybook/react'
import { createElement as r } from 'react'

import { Accordion, AccordionItem, Body, Button, Collapsible } from './index.ts'

storiesOf('Garmon', module)
  .add('Accordion', () =>
    r(
      Accordion,
      {},
      r(AccordionItem, {}, r(Button, {}, 'Item 1'), r(Body, {}, 'Item 1 body')),
      r(AccordionItem, {}, r(Button, {}, 'Item 2'), r(Body, {}, 'Item 2 body')),
    ),
  )
  .add('Collapsible', () =>
    r(
      'div',
      {},
      r(
        Collapsible,
        {},
        r(Button, {}, 'Collapsible 1'),
        r(Body, {}, 'Collapsible 1 body'),
      ),
      r(
        Collapsible,
        {},
        r(Button, {}, 'Collapsible 2'),
        r(Body, {}, 'Collapsible 2 body'),
      ),
    ),
  )
