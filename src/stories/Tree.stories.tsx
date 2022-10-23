import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ReactTree, TreeRenderFn } from '..'

import { storyNodes } from './fixtures/Nodes'
import { storyCustomTheme } from './fixtures/Theme'

const CustomNode: TreeRenderFn = ({ node }) => {
  return <div title="UGH">{node.label}</div>
}

const CustomIcon: TreeRenderFn = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 16 16"
      >
        <rect width="100%" height="100%" fill="black" />
      </svg>
    </div>
  )
}

export default {
  title: '@naisutech/react-tree',
  component: ReactTree,
  argTypes: {
    theme: {
      options: ['light', 'dark', 'exampleCustomTheme'],
      control: {
        type: 'select'
      }
    },
    themes: {
      control: {
        type: 'object'
      }
    },
    RenderNode: {
      options: ['None', 'Custom'],
      mapping: {
        None: undefined,
        Custom: CustomNode
      }
    },

    RenderIcon: {
      options: ['None', 'Custom'],
      mapping: {
        None: undefined,
        Custom: CustomIcon
      }
    }
  }
} as ComponentMeta<typeof ReactTree>

const TreeStoryTemplate: ComponentStory<typeof ReactTree> = args => (
  <ReactTree {...args} />
)

export const Basic = TreeStoryTemplate.bind({})

Basic.args = {
  nodes: storyNodes,
  loading: false,
  theme: 'light',
  themes: storyCustomTheme,
  defaultOpenNodes: undefined,
  defaultSelectedNodes: undefined,
  messages: {
    loading: 'Loading...',
    noData: 'No data to render 😔',
    emptyItems: '[Empty]'
  },
  enableItemAnimations: true,
  enableIndicatorAnimations: true,
  showEmptyItems: true,
  noIcons: false,
  truncateLongText: false,
  multiSelect: false,
  containerStyles: {},
  RenderNode: 'None',
  RenderIcon: 'None',
  selectedNodes: undefined,
  openNodes: undefined
}

export const ControlledSelectedNodes = TreeStoryTemplate.bind({})

ControlledSelectedNodes.args = {
  nodes: storyNodes,
  loading: false,
  theme: 'light',
  themes: storyCustomTheme,
  defaultOpenNodes: undefined,
  defaultSelectedNodes: undefined,
  messages: {
    loading: 'Loading...',
    noData: 'No data to render 😔',
    emptyItems: '[Empty]'
  },
  enableItemAnimations: true,
  enableIndicatorAnimations: true,
  showEmptyItems: true,
  noIcons: false,
  truncateLongText: false,
  containerStyles: {},
  RenderNode: '',
  RenderIcon: '',
  selectedNodes: ['FTest'],
  openNodes: ['NodeTest1', 'NodeTest1-1']
}

export const ControlledOpenNodes = TreeStoryTemplate.bind({})

ControlledOpenNodes.args = {
  nodes: storyNodes,
  loading: false,
  theme: 'light',
  themes: storyCustomTheme,
  defaultOpenNodes: undefined,
  defaultSelectedNodes: undefined,
  messages: {
    loading: 'Loading...',
    noData: 'No data to render 😔',
    emptyItems: '[Empty]'
  },
  enableItemAnimations: true,
  enableIndicatorAnimations: true,
  showEmptyItems: true,
  noIcons: false,
  truncateLongText: false,
  containerStyles: {},
  RenderNode: '',
  RenderIcon: '',
  selectedNodes: undefined,
  openNodes: ['NodeTest1']
}
