# About this repository

This is a monorepo for React components I'm developing and releasing to npm.
Each package is licensed under the MIT license, as is this entire repo.

See the README of each package for more information of how to use the component.

## Packages

- [Garmon](packages/garmon) – accordions and collapsible sections
- [React Input Feedback](packages/react-input-feedback)
- [React Labeled](packages/react-labeled)
- [React Submit](packages/react-submit)

Note: The package React Sequential Id is obsolete and has been removed. Use the
[`useId` hook](https://reactjs.org/docs/hooks-reference.html#useid) introduced
in React 18 instead.

## Contributing

Although I'm making these components to solve my own use cases, I will happily
accept suggestions for improvements, bug reports and pull requests.

To get started, please check out the repository, then run these commands:

```
npm install
npm run bootstrap
npm test
```

If everything goes smoothly, all the tests should pass.

Code contributions should be formatted with Prettier according to the
configuration in `.prettierrc`.

## Legal

Copyright © 2017-2019, 2022 Reidar Djupvik

Licensed under the MIT license. See the `LICENSE` file for details.

