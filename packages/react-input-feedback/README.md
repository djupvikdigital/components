# React Input Feedback

React Final Form compatible form field component that shows a provided error
message

## Usage

```jsx
import Input from 'react-input-feedback'
import { Field, Form } from 'react-final-form'

export default FormComponent(props) {
  return (
    <Form onSubmit={props.submitHandler}>
      {
        ({ handleSubmit }) =>
          (
            <form onSubmit={handleSubmit}>
              <p>
                <label>Label: <Field component={Input} name="input" /></label>
              </p>
            </form>
          )
      }
    </Form>
  )
}
```

With custom components (Redux Final Form's Field passes the `components` prop to
`Input`):

```jsx
import Input from 'react-input-feedback'
import { Field, Form } from 'react-final-form'

import MyError from './my-error'
import MyInput from './my-input'
import MyWrapper from './my-wrapper'

export default FormComponent(props) {
  return (
    <Form onSubmit={props.submitHandler}>
      {
        ({ handleSubmit }) =>
          (
            <form onSubmit={handleSubmit}>
              <p>
                <label>
                  Label:
                  <Field
                    component={Input}
                    components={{
                      error: MyError,
                      input: MyInput,
                      wrapper: MyWrapper
                    }}
                    name="input"
                  />
                </label>
              </p>
            </form>
          )
      }
    </Form>
  )
}
```

## Legal

Copyright © 2017-2019 Reidar Djupvik

Licensed under the MIT license. See the `LICENSE` file for details.
