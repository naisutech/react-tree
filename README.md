# react-tree

a hierarchical object tree component for React

![demo](./stories/demo/react-tree-demo.gif)

- supports dark (default) and light theme
- supports three sizes: full width, half width and narrow (33%)
- optimized UX to clearly indicate open/closed folders, selected items and reactions to user input
- optimized for long object labels: ellipsis when labels become too large for container
- optimized for deeply nested structures: container becomes scrollable when nested items might become hidden outside of container
- stylable: provide override CSS with suitable selectors (see Tree.scss for reference)
- will show loading progress if data not supplied or not ready

## add to a project

`yarn add @naisutech/react-tree` or `npm install @naisutech/react-tree`

## usage

```jsx
import Tree from '@naisutech/react-tree'

// component code

const data = ... // fetch data
const onSelect = selectedNode => {
  // do something with selected node
}

<Tree nodes={data} onSelect={onSelect} />
```

## data format

- data should be a flat list of nodes with at least `label`, `id`, `parentId` fields
- root nodes have `null` on `parentId` property
- files should be a flat list of nodes on `items` property inside a node, but can be `null`
- example:

```json
[
  {
    "id": 12345678,
    "parentId": null,
    "label": "My parent node",
    "items": [
      {
        "id": 87654321,
        "lavel": "My file",
        "parentId": 12345678
      }
    ]
  },
  {
    "id": 56789012,
    "parentId": 12345678,
    "label": "My child node",
    "items": null
  }
]
```

## api

```jsx
<Tree
  nodes={Array} // see data format
  onSelect={Function} // fired every click of node or leaf with selected item as argument
  darkMode={Boolean} // true (default), false
  size={String} // full (default), half, narrow
/>
```

## contributing

open issues and PRs and we'll work together
