# React Input Feedback

React Final Form compatible form field component that shows a provided error
message

## Usage

```jsx
import React from 'react'
import { InputFeedback } from 'react-input-feedback'
import { Field, Form } from 'react-final-form'

export default FormComponent(props) {
  return (
    <Form onSubmit={props.submitHandler}>
      {
        ({ handleSubmit }) =>
          (
            <form onSubmit={handleSubmit}>
              <p>
                <label>
                  Label: <Field component={InputFeedback} name="input" />
                </label>
              </p>
            </form>
          )
      }
    </Form>
  )
}
```

With render callback:

```jsx
import React from 'react'
import { InputFeedback } from 'react-input-feedback'
import { Field, Form } from 'react-final-form'

import MyError from './my-error'
import MyInput from './my-input'

function render(props) {
  return (
    <InputFeedback {...props}>
      {
        ({ error, getErrorProps, getInputProps }) => (
          <React.Fragment>
            <MyInput {...getInputProps({ className: 'input' })} />
            {
              error && (
                <MyError {...getErrorProps({ className: 'error' })}>
                  {error}
                </MyError>
              )
            }
          </React.Fragment>
        )
      }
    </InputFeedback>
  )
}

export default function FormComponent(props) {
  return (
    <Form onSubmit={props.submitHandler}>
      {
        ({ handleSubmit }) =>
          (
            <form onSubmit={handleSubmit}>
              <p>
                <label>
                  Label:
                  <Field name="input" render={render} />
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
