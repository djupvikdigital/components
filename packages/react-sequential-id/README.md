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

The component class exposes the ID factory as a static method `idFactory`. It is
a good idea to set this between each render on the server side, or else there
will be a mismatch between client and server ids:

```jsx
import { renderToString } from 'react-dom/server'
import SequentialId, { createIdFactory } from 'react-sequential-id'

import App from './components/app'

function handler(req, res) {
  SequentialId.idFactory = createIdFactory()
  const html = renderToString(<App />)
  res.send(
    '<!DOCTYPE html><title></title><div id="react-root">' + html + '</div>'
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

### createIdFactory

This function creates an ID factory like the one used by the default component.
It is a sequentially increasing integer prefixed by the letter `i`.

```javascript
import { createIdFactory } from 'react-sequential-id'

const idFactory = createIdFactory()
const id = idFactory() // id === 'i0'
```

## Legal

Copyright © 2017, 2018 Reidar Djupvik

Licensed under the MIT license. See the `LICENSE` file for details.
