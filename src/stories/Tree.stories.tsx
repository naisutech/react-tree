import React, { CSSProperties } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ReactTree from '..'
import { nodes as testData } from '../mocks/full_list_data'
import { nodes as longTestData } from '../mocks/full_list_long_names_data'
import type { TreeProps, ReactTreeTheme } from '../Tree'
import './Tree.css'

export default {
  title: 'React-Tree',
  component: ReactTree,
  argTypes: {
    nodes: {
      name: 'nodes',
      description: 'The data source of your ReactTree component'
    },
    theme: {
      name: 'theme',
      options: ['light', 'dark', 'noDecorations', 'modifiedDarkLarge'],
      control: 'select',
      description: 'The name of the them you want to use to display your tree'
    },
    grow: {
      name: 'grow',
      control: 'boolean',
      description: "Whether or not the component tries to fill its container's height"
    },
    size: { name: 'size', description: '', control: 'select', options: ['full', 'half', 'narrow'] },
    onSelect: { name: 'onSelect', description: 'An event listener called every time a select/deselect action is made', control: 'function' },
    onOpenClose: { name: 'onOpenClose', description: 'An event listener called every time an open/close action is made', control: 'function' },
    isLoading: { name: 'isLoading', description: 'Overrides the view and shows a loading spinner', control: 'boolean' },
    customTheme: { name: 'customTheme', description: 'Allows you to specify a custom theme', control: 'object' },
    showEmptyItems: { name: 'showEmptyItems', description: 'Shows an indicator in empty folders', control: 'boolean' },
    noIcons: { name: 'noIcons', description: 'Remove the display of icons from the tree', control: 'boolean' },
    containerStyle: { name: 'containerStyle', description: 'Specify a set of styles for the container of the tree', control: 'object' },
    NodeRenderer: {
      name: 'NodeRenderer',
      description: 'Provide a custom node renderer. You must return a valid react element from this function',
      control: 'function'
    },
    LeafRenderer: {
      name: 'LeafRenderer',
      description: 'Provide a custom leaf renderer. You must return a valid react element from this function',
      control: 'function'
    },
    IconRenderer: {
      name: 'IconRenderer',
      description: 'Provide a custom icon renderer. This function will be passed the target icon name as a string: `node`, `leaf`, or `loader`',
      control: 'function'
    },
    animations: { name: 'animations', description: 'Enable animated folders', control: 'boolean' },
    noDataString: { name: 'noDataString', description: 'Custome strings for the `no data` message', control: 'text' },
    loadingString: { name: 'loadingString', description: 'Custome strings for the `loading` message', control: 'text' },
    emptyItemsString: { name: 'emptyItemsString', description: 'Custome strings for the `empty items` message', control: 'text' }
  }
} as ComponentMeta<typeof ReactTree>

const Template: ComponentStory<typeof ReactTree> = (args: TreeProps) => <ReactTree {...args} />

export const DefaultWithDataPropsOnly = Template.bind({})
DefaultWithDataPropsOnly.args = {
  nodes: testData
}

export const LightTheme = Template.bind({})
LightTheme.args = {
  nodes: testData,
  theme: 'light'
}

export const DarkTheme = Template.bind({})
DarkTheme.args = {
  nodes: testData,
  theme: 'dark'
}

export const WithAnimations = Template.bind({})
WithAnimations.args = {
  nodes: testData,
  theme: 'dark',
  animations: true
}

export const WithControls = Template.bind({})
WithControls.args = {
  nodes: testData,
  theme: 'dark',
  children: ({ toggleOpenCloseAllNodes, toggleSelectAllNodes, selectedNodeIds, openNodeIds }) => {
    return (
      <>
        <div style={{ padding: '10px', display: 'flex', flexWrap: 'nowrap' }}>
          <div style={{ flex: '0 0 50%' }}>
            <h3>Open Node IDs</h3>
            <pre style={{ height: '50px', overflow: 'auto' }}>
              <code style={{ whiteSpace: 'pre-wrap' }}>{openNodeIds?.join(', ')}</code>
            </pre>
          </div>
          <div>
            <h3>Selected Element IDs</h3>
            <pre style={{ height: '50px', overflow: 'auto' }}>
              <code style={{ whiteSpace: 'pre-wrap' }}>{selectedNodeIds?.join(', ')}</code>
            </pre>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={() => typeof toggleSelectAllNodes === 'function' && toggleSelectAllNodes()}>
            {selectedNodeIds && selectedNodeIds.length === 0 ? `Select` : 'Deselect'} all elements
          </button>
          <button onClick={() => typeof toggleOpenCloseAllNodes === 'function' && toggleOpenCloseAllNodes()}>
            {openNodeIds && openNodeIds.length === 0 ? `Open` : 'Close'} all nodes
          </button>
        </div>
      </>
    )
  }
}

export const CustomNodesAndLeaves = Template.bind({})
CustomNodesAndLeaves.args = {
  nodes: testData,
  theme: 'light',
  NodeRenderer: ({ data, isOpen, level, selected }) => {
    const classes = ['custom-node', isOpen ? 'open' : undefined, selected ? 'selected' : undefined].join(' ')
    return (
      <div className={classes} style={{ width: '100%', ['--icon-pos']: `calc(2px + ${level * 25}px)` } as CSSProperties & { '--icon-pos': string }}>
        <span style={{ paddingLeft: `calc(28px + ${level * 25}px)`, fontStyle: 'italic' }}>{data.label}</span>
      </div>
    )
  },
  LeafRenderer: ({ data, level, selected }) => {
    const classes = ['custom-leaf', selected ? 'selected' : undefined].join(' ')
    return (
      <div className={classes} style={{ width: '100%', ['--icon-pos']: `calc(2px + ${(level + 1) * 25}px)` } as CSSProperties & { '--icon-pos': string }}>
        <span style={{ paddingLeft: `calc(28px + ${(level + 1) * 25}px)` }}>{data.label}</span>
      </div>
    )
  }
}

export const CustomIcons = Template.bind({})
CustomIcons.args = {
  nodes: testData,
  IconRenderer: ({ label }) => {
    switch (label) {
      case 'node': {
        return <span>👉</span>
      }
      case 'leaf': {
        return <span>🍀</span>
      }
      default: {
        return <span>😵‍💫</span>
      }
    }
  }
}

export const ShowEmptyItems = Template.bind({})
ShowEmptyItems.args = {
  nodes: testData,
  theme: 'dark',
  showEmptyItems: true,
  grow: false
}

export const Grow = Template.bind({})
Grow.args = {
  nodes: testData,
  theme: 'dark',
  grow: true
}

export const DefaultFullSize = Template.bind({})
DefaultFullSize.args = {
  nodes: testData,
  theme: 'light',
  size: 'full',
  grow: true
}

export const HalfWidthSize = Template.bind({})
HalfWidthSize.args = {
  nodes: testData,
  theme: 'dark',
  size: 'half',
  grow: true
}

export const NarrowWidthSize = Template.bind({})
NarrowWidthSize.args = {
  nodes: testData,
  theme: 'light',
  size: 'narrow',
  grow: true
}

export const NoData = Template.bind({})
NoData.args = {
  nodes: undefined,
  theme: 'light'
}

export const IsLoading = Template.bind({})
IsLoading.args = {
  nodes: testData,
  theme: 'dark',
  isLoading: true,
  grow: true
}

export const CustomThemeNoIndicatorsNoSeparatorsWithTinyText = Template.bind({})
CustomThemeNoIndicatorsNoSeparatorsWithTinyText.args = {
  nodes: testData,
  theme: 'noDecorations',
  customTheme: {
    noDecorations: {
      text: '#333',
      bg: 'gold',
      indicator: 'transparent',
      separator: 'transparent',
      icon: '#333',
      selectedBg: 'lightpink',
      selectedText: '#333',
      hoverBg: 'hotpink',
      hoverText: '#fafafa',
      accentBg: 'gold',
      accentText: '#666',
      textSize: 'small'
    },
    modifiedDarkLarge: {
      text: '#fafafa',
      bg: '#2d3439',
      indicator: 'gold',
      separator: 'gold',
      icon: 'gold',
      selectedBg: '#3f464e',
      selectedText: '#fafafa',
      hoverBg: '#505a63',
      hoverText: '#fafafa',
      accentBg: '#2d3439',
      accentText: '#999',
      textSize: 'large'
    }
  },
  showEmptyItems: true,
  grow: true,
  animations: true
}

export const TruncatedLongLabels = Template.bind({})
TruncatedLongLabels.args = {
  nodes: longTestData,
  theme: 'dark',
  size: 'narrow',
  grow: true
}

export const CustomisedLoadingLabel = Template.bind({})
CustomisedLoadingLabel.args = {
  nodes: undefined,
  theme: 'dark',
  size: 'narrow',
  grow: true,
  isLoading: true,
  loadingString: 'Growing a tree 🌱...'
}

export const CustomisedNoDataLabel = Template.bind({})
CustomisedNoDataLabel.args = {
  nodes: undefined,
  theme: 'dark',
  size: 'narrow',
  grow: true,
  noDataString: 'No items to show 😒'
}

export const CustomisedNoItemsLabel = Template.bind({})
CustomisedNoItemsLabel.args = {
  nodes: longTestData,
  theme: 'light',
  size: 'half',
  grow: true,
  showEmptyItems: true,
  emptyItemsString: '<No data in this folder>'
}
