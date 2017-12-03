import { configure } from '@storybook/react'

const req = require.context('../packages', true, /\.stories\.ts$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
