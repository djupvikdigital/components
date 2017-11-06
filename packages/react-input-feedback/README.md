# React Input Feedback

Redux Form compatible form field component that shows a provided error message

## Usage

```jsx
import Input from 'react-input-feedback'
import { Field } from 'redux-form'

export default FormComponent(props) {
  return (
    <form>
      <p><label>Label: <Field component={Input} name="input" /></label></p>
    </form>
    )
}
```

With custom components (Redux Forms Field passes the `components` prop to
`Input`):

```jsx
import Input from 'react-input-feedback'
import { Field } from 'redux-form'

import MyError from './my-error'
import MyInput from './my-input'
import MyWrapper from './my-wrapper'

export default FormComponent(props) {
  return (
    <form>
      <p>
        <label>
          Label:
          <Field
            component={Input}
            components={{ error: MyError, input: MyInput, wrapper: MyWrapper }}
            name="input"
          />
        </label>
      </p>
    </form>
    )
}
```

## Legal

Copyright © 2017 Reidar Djupvik

Licensed under the MIT license. See the `LICENSE` file for details.
