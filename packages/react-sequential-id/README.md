# React Sequential ID

Component which gives a sequential ID to a function child

## Installation

```
npm install react-sequential-id
```

## Usage

```jsx
import SequentialId from 'react-sequential-id'

function ReactComponent() {
  return (
    <SequentialId>
      {(id) => (
        <p>
          <label for={id}>Label: <input id={id} name="input" /></label>
        </p>
      )}
    </SequentialId>
  )
}
```

### withIdFactory

Use this helper if you want to use your own factory function for generating
IDs.

```javascript
import { withIdFactory } from 'react-sequential-id'
import uniqueid from 'uniqueid'

const SequentialId = withIdFactory(uniqueid('my-prefix'))
```

### defaultIdFactory

This is the default ID factory used by the default component. It is a
sequentially increasing integer prefixed by the letter `i`.

```javascript
import { defaultIdFactory } from 'react-sequential-id'

const id = defaultIdFactory() // id === 'i0'
```

## Legal

Copyright © 2017, 2018 Reidar Djupvik

Licensed under the MIT license. See the `LICENSE` file for details.
