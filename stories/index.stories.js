import React from 'react'

import { storiesOf } from '@storybook/react'
import Tree from '../src/Tree'
import { nodes } from './data/test'
import { nodes as longNodes } from './data/test_long_names'
import { nodes as expansionNodes } from './data/test_expanded'
import { action, configureActions } from '@storybook/addon-actions'

storiesOf('React-Tree', module)
  .add('Dark mode (full width) loading', () => <Tree nodes={null} />)
  .add('Light mode (full width) loading', () => (
    <Tree nodes={null} darkMode={false} />
  ))
  .add('Dark mode (half width) loading', () => (
    <Tree nodes={null} size="half" />
  ))
  .add('Light mode (half width) loading', () => (
    <Tree nodes={null} darkMode={false} size="half" />
  ))
  .add('Dark mode (narrow width) loading', () => (
    <Tree nodes={null} size="narrow" />
  ))
  .add('Light mode (narrow width) loading', () => (
    <Tree nodes={null} darkMode={false} size="narrow" />
  ))
  .add('Dark mode (full width)', () => (
    <Tree nodes={nodes} onSelect={action('select-node')} />
  ))
  .add('Light mode (full width)', () => (
    <Tree nodes={nodes} darkMode={false} onSelect={action('select-node')} />
  ))
  .add('Dark mode (full width) with long labels', () => (
    <Tree nodes={longNodes} onSelect={action('select-node')} />
  ))
  .add('Light mode (full width) with long labels', () => (
    <Tree nodes={longNodes} darkMode={false} onSelect={action('select-node')} />
  ))
  .add('Dark mode (half width) with long labels', () => (
    <Tree nodes={longNodes} size="half" onSelect={action('select-node')} />
  ))
  .add('Light mode (half width) with long labels', () => (
    <Tree
      nodes={longNodes}
      darkMode={false}
      size="half"
      onSelect={action('select-node')}
    />
  ))
  .add('Dark mode (narrow width) with long labels', () => (
    <Tree nodes={longNodes} size="narrow" onSelect={action('select-node')} />
  ))
  .add('Light mode (narrow width) with long labels', () => (
    <Tree
      nodes={longNodes}
      darkMode={false}
      size="narrow"
      onSelect={action('select-node')}
    />
  ))
  .add('Expanded all', () => (
    <Tree nodes={expansionNodes} darkMore={false} size={'narrow'} />
  ))
