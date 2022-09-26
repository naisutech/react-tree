import * as React from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { DefaultTheme, ThemeProvider } from 'styled-components'
export {
  TreeNodeId,
  TreeNode,
  TreeNodeList,
  ReactTreeTheme,
  ThemeSettings
} from './Tree'
export { useReactTreeApi } from './hooks/useReactTreeApi'
import { TreeNodeId, TreeNodeList, ThemeSettings } from './Tree'
import ReactTreeContext, { ReactTreeApi } from './Tree/Context'
import TreeRoot from './Tree/TreeRoot'
import coreTheme from './styles/theme'

/**
 * @public
 */
export declare interface ReactTreeProps {
  nodes: TreeNodeList
  defaultOpenNodes?: TreeNodeId[]
  defaultSelectedNodes?: TreeNodeId[]
  apiRef?: React.MutableRefObject<ReactTreeApi>
  messages?: { noData?: string; loading?: string; emptyItems?: string }
  loading?: boolean
  enableAnimations?: boolean
  showEmptyItems?: boolean
  noIcons?: boolean
  theme?: string
  themes?: ThemeSettings
  containerStyles?: React.CSSProperties
  RenderNode?: () => React.ReactNode
  RenderIcon?: ({
    data,
    type
  }: {
    data?: Node
    type?: 'leaf' | 'node' | 'loader'
  }) => React.ReactNode
}

export const ReactTree = ({
  nodes = [],
  defaultOpenNodes,
  defaultSelectedNodes,
  apiRef,
  messages = {
    loading: 'Loading...',
    noData: 'No data to render 😔',
    emptyItems: '[Empty]'
  },
  loading = false,
  enableAnimations = false,
  showEmptyItems = false,
  noIcons = false,
  theme = 'light',
  themes,
  containerStyles
}: ReactTreeProps) => {
  apiRef
  showEmptyItems
  noIcons
  containerStyles
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

  messages

  return (
    <ThemeProvider theme={config}>
      <LazyMotion features={domAnimation}>
        <ReactTreeContext.Provider
          nodes={nodes}
          defaultOpenNodes={defaultOpenNodes}
          defaultSelectedNodes={defaultSelectedNodes}
          options={{
            animations: enableAnimations,
            lazy: false,
            showEmptyItems,
            noIcons
          }}
          theme={theme}
        >
          <TreeRoot loading={loading} containerStyles={containerStyles} />
        </ReactTreeContext.Provider>
      </LazyMotion>
    </ThemeProvider>
  )
}
