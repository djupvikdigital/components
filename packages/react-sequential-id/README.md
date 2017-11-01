# React Sequential ID

Component which gives a sequential ID to a function child

## Installation

```
npm install react-sequential-id
```

## Usage

```javascript
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

Use this helper iff you want to use your own factory function for generating
IDs.

```javascript
import { withIdFactory } from 'react-sequential-id'
import uniqueid from 'uniqueid'

const SequentialId = withIdFactory(uniqueid('my-prefix'))
```

## Legal

Copyright © 2017 Reidar Djupvik

Licensed under the MIT license. See the `LICENSE` file for details.
