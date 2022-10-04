import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ReactTree, TreeNodeId } from '..'

import { storyNodes } from './fixtures/Nodes'
import { storyCustomTheme } from './fixtures/Theme'

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
    RenderNode: { control: 'text' },
    RenderIcon: { control: 'text' }
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
  containerStyles: {},
  RenderNode: '',
  RenderIcon: '',
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
