# React Sequential ID

Component which gives a sequential ID to a function child

## Installation

```
npm install react-sequential-id
```

## Usage

```jsx
import { IdProvider, SequentialId } from 'react-sequential-id'

function ReactComponent() {
  return (
    <IdProvider>
      <SequentialId>
        {(id) => (
          <p>
            <label for={id}>Label: <input id={id} name="input" /></label>
          </p>
        )}
      </SequentialId>
    </IdProvider>
  )
}
```

### IdProvider

Using an `IdProvider` somewhere near the top of the app hierarchy is highly
recommended. This ensures that rerenders (like will often happens on the server)
won't give you different IDs as the sequence is started anew for the children of
an `IdProvider`. It also takes an optional `factory` prop if you want to use a
different factory function (for example, using a different prefix):

```jsx
import uniqueid from 'uniqueid'

import { IdProvider, SequentialId } from 'react-sequential-id'

function ReactComponent() {
  return (
    <IdProvider factory={uniqueid('custom_prefix_')}>
      <SequentialId>
        {(id /* === 'custom_prefix_0' */) => (
          <p>
            <label for={id}>Label: <input id={id} name="input" /></label>
          </p>
        )}
      </SequentialId>
    </IdProvider>
  )
}
```

### Consumer

If you need access to the ID factory currently in use then you can use the
`Consumer` component.

```jsx
import { Consumer } from 'react-sequential-id'

function ReactComponent() {
  return (
    <Consumer>
      {(idFactory) => {
        const id = idFactory()
        return (
          <p>
            <label for={id}>Label: <input id={id} name="input" /></label>
          </p>
        )
      }}
    </Consumer>
  )
}
```

### createIdFactory

This function creates an ID factory like the one used by the default component.
It is a sequentially increasing integer prefixed by the letter `i`.

```javascript
import { createIdFactory } from 'react-sequential-id'

const idFactory = createIdFactory()
const id = idFactory() // id === 'i0'
```

## Legal

Copyright © 2017-2019 Reidar Djupvik

Licensed under the MIT license. See the `LICENSE` file for details.
