import '@storybook/addon-console'
import { configure, addDecorator } from '@storybook/react'
import { setConsoleOptions, withConsole } from '@storybook/addon-console'

// console
setConsoleOptions({
  panelExclude: []
})

addDecorator((storyFn, context) => withConsole()(storyFn)(context))

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
