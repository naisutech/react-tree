import * as React from 'react'
import { TreeNodeId, TreeNodeList } from 'Tree'

/**
 * @public
 */
export declare interface ReactTreeApi {
  getOpenNodes: () => (number | string)[]
  getSelectedNodes: () => (number | string)[]
  toggleNodeSelectedState: (node: string | number) => void
  toggleNodeOpenState: (node: string | number) => void
  toggleAllNodesOpenState: (state: 'open' | 'closed') => void
  toggleAllNodesSelectedState: (state: 'selected' | 'unselected') => void
  toggleOpenNodes: (nodes: (number | string)[]) => void
  toggleOpenClosedNodes: (nodes: (number | string)[]) => void
  toggleClosedNodes: (nodes: (number | string)[]) => void
  selectNodes: (nodes: (number | string)[]) => void
  deselectNodes: (nodes: (number | string)[]) => void
  toggleSelectedNodes: (nodes: (number | string)[]) => void
}

export interface ReactTreeState {
  nodes: TreeNodeList
  selectedNodes: TreeNodeId[]
  openNodes: TreeNodeId[]
  options: {
    folderAnimations: boolean
    indicatorAnimations: boolean
    lazy: boolean
    showEmptyItems: boolean
    noIcons: boolean
    truncateLongText: boolean
    messages: { noData?: string; loading?: string; emptyItems?: string }
  }
  theme: string
}

export type TReactTreeContext = ReactTreeState & ReactTreeApi

const _ReactTreeContext = React.createContext<TReactTreeContext>({
  nodes: [],
  selectedNodes: [],
  openNodes: [],
  options: {
    folderAnimations: false,
    indicatorAnimations: false,
    showEmptyItems: false,
    noIcons: false,
    lazy: false,
    truncateLongText: false,
    messages: {
      loading: 'Loading...',
      noData: 'No data to render 😔',
      emptyItems: '[Empty]'
    }
  },
  theme: 'light',
  getOpenNodes: () => [],
  getSelectedNodes: () => [],
  toggleNodeSelectedState: () => {},
  toggleNodeOpenState: () => {},
  toggleAllNodesOpenState: () => {},
  toggleAllNodesSelectedState: () => {},
  toggleOpenNodes: () => {},
  toggleClosedNodes: () => {},
  toggleOpenClosedNodes: () => {},
  selectNodes: () => {},
  deselectNodes: () => {},
  toggleSelectedNodes: () => {}
})

const ReactTreeContextProvider = ({
  children,
  nodes = [],
  defaultSelectedNodes = [],
  defaultOpenNodes = [],
  options = {
    folderAnimations: false,
    indicatorAnimations: false,
    lazy: false,
    showEmptyItems: false,
    noIcons: false,
    truncateLongText: false,
    messages: {
      loading: 'Loading...',
      noData: 'No data to render 😔',
      emptyItems: '[Empty]'
    }
  },
  theme = 'light',
  apiRef
}: React.PropsWithChildren<{
  nodes?: TreeNodeList
  defaultSelectedNodes?: TreeNodeId[]
  defaultOpenNodes?: TreeNodeId[]
  options?: {
    folderAnimations?: boolean
    indicatorAnimations?: boolean
    lazy?: boolean
    showEmptyItems?: boolean
    noIcons?: boolean
    truncateLongText?: boolean
    messages?: { noData?: string; loading?: string; emptyItems?: string }
  }
  theme: string
  apiRef?: React.MutableRefObject<ReactTreeApi>
}>) => {
  const [nodeList, setTreeNodeList] = React.useState(nodes)
  const [selectedNodes, setSelectedNodes] =
    React.useState<TreeNodeId[]>(defaultSelectedNodes)
  const [openNodes, setOpenNodes] =
    React.useState<TreeNodeId[]>(defaultOpenNodes)
  const [treeConfig, setTreeConfig] = React.useState<{
    folderAnimations: boolean
    indicatorAnimations: boolean
    lazy: boolean
    showEmptyItems: boolean
    noIcons: boolean
    truncateLongText: boolean
    messages?: { noData?: string; loading?: string; emptyItems?: string }
  }>({
    folderAnimations: options?.folderAnimations || false,
    indicatorAnimations: options?.indicatorAnimations || false,
    lazy: options.lazy || false,
    showEmptyItems: options.showEmptyItems || false,
    noIcons: options.noIcons || false,
    truncateLongText: options.truncateLongText || false
  })

  // define API methods
  const treeApi = React.useMemo(() => {
    return {
      getOpenNodes: () => openNodes,
      getSelectedNodes: () => selectedNodes,
      toggleNodeSelectedState: (nodeId: TreeNodeId) => {
        setSelectedNodes(nodes => {
          const _nodes = nodes.slice()
          const i = _nodes.indexOf(nodeId)
          if (i !== -1) {
            _nodes.splice(i, 1)
          } else {
            _nodes.push(nodeId)
          }
          return _nodes
        })
      },
      toggleNodeOpenState: (nodeId: TreeNodeId) => {
        setOpenNodes(nodes => {
          const _nodes = nodes.slice()
          const i = _nodes.indexOf(nodeId)
          if (i !== -1) {
            _nodes.splice(i, 1)
          } else {
            _nodes.push(nodeId)
          }
          return _nodes
        })
      },
      toggleAllNodesOpenState: (state: 'open' | 'closed') => {
        const list = state === 'open' ? nodeList.map(n => n.id) : []
        setOpenNodes(list)
      },
      toggleAllNodesSelectedState: (state: 'selected' | 'unselected') => {
        const list =
          state === 'selected'
            ? nodeList
                .map(n => n.id)
                .concat(nodeList.flatMap(n => n.items || []).map(n => n.id))
            : []
        setSelectedNodes(list)
      },
      toggleOpenNodes: (nodes: TreeNodeId[]) => {
        setOpenNodes(nList => {
          return Array.from(new Set(nList.concat(nodes)))
        })
      },
      toggleClosedNodes: (nodes: TreeNodeId[]) => {
        setOpenNodes(nList => {
          return nList.filter(n => !nodes.includes(n))
        })
      },
      toggleOpenClosedNodes: (nodes: TreeNodeId[]) => {
        setOpenNodes(nodes)
      },
      selectNodes: (nodes: TreeNodeId[]) => {
        setSelectedNodes(nList => {
          return Array.from(new Set(nList.concat(nodes)))
        })
      },
      deselectNodes: (nodes: TreeNodeId[]) => {
        setSelectedNodes(nList => {
          return nList.filter(n => !nodes.includes(n))
        })
      },
      toggleSelectedNodes: (nodes: TreeNodeId[]) => {
        setSelectedNodes(nodes)
      }
    }
  }, [nodeList, openNodes, selectedNodes])

  // provide external access to API
  React.useImperativeHandle(apiRef, () => treeApi)

  React.useEffect(() => {
    setTreeNodeList(nodes)
  }, [nodes])

  React.useEffect(() => {
    setTreeConfig({
      folderAnimations: options?.folderAnimations || false,
      indicatorAnimations: options?.indicatorAnimations || false,
      lazy: options.lazy || false,
      showEmptyItems: options.showEmptyItems || false,
      noIcons: options.noIcons || false,
      truncateLongText: options.truncateLongText || false,
      messages: options.messages || {
        loading: 'Loading...',
        noData: 'No data to render 😔',
        emptyItems: '[Empty]'
      }
    })
  }, [options])

  const value = React.useMemo(() => {
    return {
      nodes: nodeList,
      selectedNodes,
      openNodes,
      options: treeConfig,
      theme,
      ...treeApi
    }
  }, [nodes, selectedNodes, openNodes, theme, treeApi])

  return (
    <_ReactTreeContext.Provider value={value}>
      {children}
    </_ReactTreeContext.Provider>
  )
}

const useReactTreeContext = () => React.useContext(_ReactTreeContext)

const ReactTreeContext = {
  Provider: ReactTreeContextProvider,
  Consumer: _ReactTreeContext.Consumer,
  useReactTreeContext
}

export default ReactTreeContext
