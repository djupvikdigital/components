# React Submit

Redux Form compatible submit button which sets a form value to `true`. This
means that a form can have multiple submit buttons with different `name`
attributes.

## Usage

```jsx
import SubmitButton from 'react-submit'
import { Field } from 'redux-form'

import { handleFoo, handleBar } from './api'

export default FormComponent({ handleSubmit }) {
  return (
    <form
      onSubmit={
        handleSubmit(values => {
          if (values.foo === true) {
            handleFoo(values)
          }
          else if (values.bar === true) {
            handleBar(values)
          }
        })
      }
    >
      <p>
        <Field component={SubmitButton} name="foo">Foo</Field>
        <Field component={SubmitButton} name="bar">Foo</Field>
      </p>
    </form>
  )
}
```

## Legal

Copyright © 2017 Reidar Djupvik

Licensed under the MIT license. See the `LICENSE` file for details.
