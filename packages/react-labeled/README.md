# React Labeled

Higher-order component which lets you combine a label with a form field

## Usage

```jsx
import labeled from 'react-labeled'

const LabeledInput = labeled('input')

export default ReactComponent() {
  return <LabeledInput type="text">Label</LabeledInput>
}
```

You can also provide the label as a prop, if the form component takes children:

```jsx
import labeled from 'react-labeled'

const LabeledSelect = labeled('select')

export default ReactComponent() {
  return <LabeledSelect label="Label">
    <option>Option</option>
  </LabeledSelect>
}
```

The label can be rich content:

```jsx
import labeled from 'react-labeled'

const LabeledSelect = labeled('select')

export default ReactComponent() {
  return <LabeledSelect label={<strong>Label</strong>}>
    <option>Option</option>
  </LabeledSelect>
}
```

You can provide a custom label component as an optional second argument, as long
as it accepts a `htmlFor` prop. Also, you can provide a custom wrapper with
the `component` prop (the default is `p`):

```jsx
import labeled from 'react-labeled'

import Input from './my-input'
import Label from './my-label'
import Wrapper from './my-wrapper'

const LabeledInput = labeled(Input, Label)

export default ReactComponent() {
  return <LabeledInput component={Wrapper}>Label</LabeledInput>
}
```

## Legal

Copyright © 2017, 2018, 2022 Reidar Djupvik

Licensed under the MIT license. See the `LICENSE` file for details.
