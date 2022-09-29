import * as React from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { DefaultTheme, ThemeProvider } from 'styled-components'
export { useReactTreeApi } from './hooks/useReactTreeApi'
import { TreeNodeId, TreeNodeList, ThemeSettings, TreeRenderFn } from './Tree'
import ReactTreeContext, { ReactTreeApi } from './Tree/Context'
export {
  TreeNodeId,
  TreeNode,
  TreeNodeList,
  TreeRenderFn,
  ReactTreeTheme,
  ThemeSettings
} from './Tree'
export { ReactTreeApi, TReactTreeContext } from './Tree/Context'

import TreeRoot from './Tree/TreeRoot'
import coreTheme from './styles/theme'

/**
 * @public
 */
export declare interface ReactTreeProps {
  nodes: TreeNodeList
  defaultOpenNodes?: TreeNodeId[]
  defaultSelectedNodes?: TreeNodeId[]
  messages?: {
    noData?: React.ReactNode
    loading?: React.ReactNode
    emptyItems?: React.ReactNode
  }
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
}

export const ReactTree = React.forwardRef(
  (
    {
      nodes = [],
      defaultOpenNodes,
      defaultSelectedNodes,
      selectedNodes,
      openNodes,
      messages = {
        loading: 'Loading...',
        noData: 'No data to render 😔',
        emptyItems: '[Empty]'
      },
      loading = false,
      theme = 'light',
      themes,
      enableIndicatorAnimations = false,
      enableItemAnimations = false,
      showEmptyItems = false,
      noIcons = false,
      truncateLongText = false,
      containerStyles,
      RenderNode,
      RenderIcon,
      onToggleSelectedNodes,
      onToggleOpenNodes
    }: ReactTreeProps,
    ref: React.MutableRefObject<ReactTreeApi>
  ) => {
    /**
     * Complete react-tree theme
     */
    const config: DefaultTheme = React.useMemo(() => {
      return {
        themes: {
          ...coreTheme.themes,
          ...themes
        },
        app: coreTheme.app
      }
    }, [themes])

    return (
      <ThemeProvider theme={config}>
        <LazyMotion features={domAnimation}>
          <ReactTreeContext.Provider
            nodes={nodes}
            defaultOpenNodes={defaultOpenNodes}
            defaultSelectedNodes={defaultSelectedNodes}
            options={{
              folderAnimations: enableItemAnimations,
              indicatorAnimations: enableIndicatorAnimations,
              lazy: false,
              showEmptyItems,
              noIcons,
              truncateLongText,
              messages
            }}
            theme={theme}
            apiRef={ref}
            openNodes={openNodes}
            selectedNodes={selectedNodes}
            onToggleOpenNodes={onToggleOpenNodes}
            onToggleSelectedNodes={onToggleSelectedNodes}
          >
            <TreeRoot
              loading={loading}
              containerStyles={containerStyles}
              RenderNode={RenderNode}
              RenderIcon={RenderIcon}
            />
          </ReactTreeContext.Provider>
        </LazyMotion>
      </ThemeProvider>
    )
  }
)
