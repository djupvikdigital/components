# React Submit

React Final Form compatible submit button which sets a form value to `true`.
This means that a form can have multiple submit buttons with different `name`
attributes.

## Usage

```jsx
import SubmitButton from 'react-submit'
import { Field, Form } from 'react-final-form'

import { handleFoo, handleBar } from './api'

export default FormComponent() {
  return (
    <Form
      onSubmit={
        values => {
          if (values.foo === true) {
            handleFoo(values)
          }
          else if (values.bar === true) {
            handleBar(values)
          }
        }
      }
    >
      {({ handleSubmit }) =>
        (
          <form onSubmit={handleSubmit}>
            <p>
              <Field component={SubmitButton} name="foo">Foo</Field>
              <Field component={SubmitButton} name="bar">Foo</Field>
            </p>
          </form>
        )
      }
    </Form>
  )
}
```

## Legal

Copyright © 2017, 2018, 2022 Reidar Djupvik

Licensed under the MIT license. See the `LICENSE` file for details.
