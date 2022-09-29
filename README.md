# react-tree

a hierarchical tree component for React in Typescript

[Demo+Docs here](https://naisutech.github.io/react-tree/)

![demo](./.docs/demo.gif)

## Features

- Written in Typescript will full typings exported from package
- Theming support for almost all parts of the components appearance, (**NEW** including partial theming) (see **Theming** below)
- Use as an uncontrolled component with `defaultSelectedNodes` and `defaultOpenNodes` or a completely controlled component with `selectedNodes` and `openNodes` props with `onEvent` listeners
- Fully stylable container for fixed width, or flex-box based layouts, or scrollable container when lists are too long for the parent container
- Optimized UX to clearly indicate open/closed folders, selected items and feedback on user input
- Toggle support for long-object labels with `truncateLongText` prop
- Title attributes on hover for truncated labels that are too long for container
- Toggle support for empty folders with `displayEmpty` prop
- Customizable component message strings with `messages` prop (no data, empty folders, loading) 
- Display a loading indicator and nothing when in loading state with `loading` prop
- Opt-in animated micro-interactions for opening/closing folders
- Multi-select API! hold your OS's `meta` key or `ctrl` key to be able to select/deselect multiple-nodes
- **NEW** imperative API via export `useReactTreeApi` hook. Pass the ref to the componenta (see **Imperative API** below
- **NEW** new context-based state management for better maintainability and handling of business logic
- **NEW** moved react and styled components to `peerDependencies`
- **NEW** Custom render functions for nodes and icons (full node context passed to render function with open/selected status)

## Add to a project

`yarn add @naisutech/react-tree` or `npm install @naisutech/react-tree`

## Usage

There is only one required prop: `nodes` (see **Data format**)

```jsx
import Tree from '@naisutech/react-tree'

// component code

const data = ... // fetch data

<Tree nodes={data}  />
```

## Data format

- data should be a flat list of node `objects` with required properties:
  - `label`,
  - `id`,
  - `parentId`
- optional properties:
  - `items`
- id is typed to be `number` or `string`
- root nodes should have `parentId` property set to `null`
- files/leaf items should be a flat list of node objects on `items` property inside a node.
- files do not require an `items` property (this should be obvious)
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
        "label": "My file",
        "parentId": 12345678
      }
    ]
  },
  {
    "id": 56789012,
    "parentId": 12345678,
    "label": "My child node"
  }
]
```

## Full API

There are a number of optional properties which
can be used to customise the UX of your _React Tree_ component. You can explore the full interactive docs [here](https://naisutech.github.io/react-tree/) or you can refer to the sample code below:

```tsx
<Tree
  nodes: TreeNodeList
  defaultOpenNodes?: TreeNodeId[]
  defaultSelectedNodes?: TreeNodeId[]
  messages?: { noData?: React.ReactNode; loading?: React.ReactNode; emptyItems?: React.ReactNode }
  loading?: boolean
  theme?: string
  themes?: ThemeSettings
  enableItemAnimations?: boolean
  enableIndicatorAnimations?: boolean
  showEmptyItems?: boolean
  noIcons?: boolean
  truncateLongText?: boolean
  containerStyles?: React.CSSProperties
  RenderNode?: TreeRenderFn
  RenderIcon?: TreeRenderFn
  selectedNodes?: TreeNodeId[]
  openNodes?: TreeNodeId[]
  onToggleSelectedNodes?: (nodes: TreeNodeId[]) => void
  onToggleOpenNodes?: (nodes: TreeNodeId[]) => void
/>
```

### Props list

| **Prop name**               | **Prop type**                                                                           | **Default**                                                                       | **Required** | **Description**                                                                                                                                          |
|-----------------------------|-----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `nodes`                     | `TreeNodeList`                                                                          | `[]`                                                                              | Y            | The data set for react tree to render                                                                                                                    |
| `defaultOpenNodes`          | `TreeNodeId[]`                                                                          | `undefined`                                                                       | N            | The default set of open nodes. Specify when you intend to use the component in uncontrolled mode                                                         |
| `defaultSelectedNodes `     | `TreeNodeId[]`                                                                          | `undefined`                                                                       | N            | The default set of selected nodes. Specify when you intend to use the component in uncontrolled mode                                                     |
| `openNodes`                 | `TreeNodeId[]`                                                                          | `undefined`                                                                       | N            | The currently open nodes. Specify when you intend to use the component in controlled mode.                                                               |
| `selectedNodes`             | `TreeNodeId[]`                                                                          | `undefined`                                                                       | N            | The currently selected nodes. Specify when you intend to use the component in controlled mode.                                                           |
| `theme`                     | `string`                                                                                | `light`                                                                           | N            | The curently selected theme (built-in themes are `light`, and `dark`)                                                                                    |
| `themes`                    | `ThemeSettings` (`Record<string, ReactTreeTheme>`)                                      | `{}`                                                                              | N            | The user-specified set of themes                                                                                                                         |
| `loading`                   | `boolean`                                                                               | `false`                                                                           | N            | Display a loader instead of the rendered tree                                                                                                            |
| `messages`                  | `{ noData?: React.ReactNode; loading?: React.ReactNode; emptyItems?: React.ReactNode }` | `{loading: 'Loading...', noData: 'No data to render 😔', emptyItems: '[Empty]' }` | N            | The default component message strings.                                                                                                                   |
| `enableItemAnimations`      | `boolean`                                                                               | `false`                                                                           | N            | Whether or not to animate folders on enter/exit                                                                                                          |
| `enableIndicatorAnimations` | `boolean`                                                                               | `false`                                                                           | N            | Whether or not to animate folder open/close icons                                                                                                        |
| `showEmptyItems`            | `boolean`                                                                               | `false`                                                                           | N            | Whether or not to display an indicator for empty folders                                                                                                 |
| `noIcons`                   | `boolean`                                                                               | `false`                                                                           | N            | Disable the icon display                                                                                                                                 |
| `truncateLongText`          | `boolean`                                                                               | `false`                                                                           | N            | Prepares all DOM nodes to be able to truncate long text nodes. Note this setting will have _no effect_ if container is not styled to have a fixed width. |
| `containerStyles`           | `CSSProperties`                                                                         | `{}`                                                                              | N            | Style the _React Tree_ container                                                                                                                         |
| `RenderNode`                | `TreeRenderFn`                                                                          | `undefined`                                                                       | N            | A custom renderer for `Node` elements. See **Custom rendering**                                                                                          |
| `RenderIcon`                | `TreeRenderFn`                                                                          | `undefined`                                                                       | N            | A custom renderer for `Icon` elements. See **Custom rendering**                                                                                          |
| `onToggleSelectedNodes`     | `(nodes: TreeNodeId[]) => void`                                                         | () => void                                                                        | N            | A callback called whenever items are selected/deselected                                                                                                 |
| `onToggleOpenNodes`         | `(nodes: TreeNodeId[]) => void`                                                         | () => void                                                                        | N            | A callback called whenever items are opened/closed                                                                                                       |


## Typescript

_React Tree_ is written in typescript and is fully typescript compatible. All type definitions are exported directly from the library. See `src/types` in the repo for extensive definitions

## Adding controls

[Interactive docs](https://naisutech.github.io/react-tree/?path=/story/reacttree-tree--with-controls)

_React Tree_ uses the render props pattern to provide extensibility options and publish internal data & callbacks which developers can use to add extra functionality. Using the render props pattern, you could add a control bar to the tree, or display information about the selected / open nodes. The render prop function is called when you pass children to the _ReactTree_ component. The render prop function is passed an render props object:

API:

```js
{
  toggleNodeSelection: ToggleFunction,
  toggleSelectAllNodes: ToggleFunction,
  toggleOpenCloseNode: ToggleFunction,
  toggleOpenCloseAllNodes: ToggleFunction,
  selectedNodeIds: Node[],
  openNodeIds: Node[]
}
```

Usage:

```jsx

// example using toggle open/close all nodes
<Tree nodes={[...]}>
  {(controls) => {
    return <button onClick={() => controls.toggleOpenCloseAllNodes()}>Open/close all nodes</button>
  }}
</Tree>
```

### Programatically selecting multiple elements

You can use multi-select out of the box by holding a modifier key (`meta` or `ctrl`) to select multiple elements (leaves or nodes), but there is an additional API for selecting elements available via the render props pattern:

Usage:

```jsx

/*
* Example using toggleNodeSelection
*/
<Tree nodes={[...]}>
  {(controls) => {
    const multiSelect = true // selected node will APPEND to list of already selected nodes, not replace
    return <button onClick={() => controls.toggleNodeSelection(nodeId, multiSelect)}>Open/close all nodes</button>
  }}
</Tree>
```

## Theming

`react-tree` supports custom theming. All values are CSS colours or hexes (.e.g. `#000`, `hotpink`, or even `transparent`). Provide the theme object to the `customTheme` prop (with a property matching your theme name) and provide your theme name to the `theme` prop. You can also specify a change in overall text size via a custom theme, which accepts one of 5 values: `'xsmall' (10px) | 'small' (13px) | 'default' (17px) | 'large' (20px) | 'xlarge' (34px)`

```js
const myThemes = {
  modifiedDarkLarge: {
    text: '#fafafa', // text color
    bg: '#2d3439', // background color of whole tree
    indicator: 'gold', // open folder indicator color
    separator: 'gold', // row seperator color
    icon: 'gold', // fill & stroke color of default icons - has no effect when using custom icons
    selectedBg: '#3f464e', // background of selected element
    selectedText: '#fafafa', // text color of selected element
    hoverBg: '#505a63', // background of hovered element
    hoverText: '#fafafa', // text color of hovered element
    accentBg: '#2d3439', // background of empty folder element
    accentText: '#999', // text color of empty folder element
    textSize: 'large' // preferred text size
  }
}
```

```jsx
<Tree nodes={data} theme="modifiedDarkLarge" customTheme={myThemes} />
```

> Result

![result](./.docs/modified_theme.png)

## Icons

`react-tree` comes with a pretty solid set of default icons for showing node elements, leaf elements, and a loading indicator. However, if you want to hide the icons, pass the `noIcons` prop

If you want to customize the icons, you can! Some conditions:

- the icons are set to a default square dimensions and will force whatever icons you provide into a `20px` square container using the `object-fit: contain` method
- overflow out of the box is hidden


You can customize the icons by providing a render function to the props `IconRenderer` which _must_ return a _valid react element/component_. The icon renderer will be passed three props:


- `type : 'node' | 'leaf' | 'loader'`: use to conditionally render the correct icon.
- `data: Node`: the content of the node/leaf
- `isOpen: boolean`: use only for node, indicates whether node is open or not

```jsx
IconRender={({type}) => {
  return type === 'leaf | node' ? <...> : ...
}}
```

If `null` is returned by the rendering function, the appropriate default icon will be used instead.

## TODO in v3 and beyond

- add drag and drop support
- any other requested features..

## Contributing

- open issues and PRs and we'll work together!
