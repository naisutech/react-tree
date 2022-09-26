import * as React from 'react'
import { TreeNodeId, TreeNodeList } from 'Tree'

/**
 * @public
 */
export declare interface ReactTreeApi {
  getOpenNodes: () => (number | string)[]
  getSelectedNodes: () => (number | string)[]
  openNodes: (nodes: (number | string)[]) => void
  closeNodes: (nodes: (number | string)[]) => void
  selectNodes: (nodes: (number | string)[]) => void
  deselectNodes: (nodes: (number | string)[]) => void
}

export interface ReactTreeState {
  nodes: TreeNodeList
  selectedNodes: TreeNodeId[]
  openNodes: TreeNodeId[]
  options: {
    animations: boolean
    lazy: boolean
    showEmptyItems: boolean
    noIcons: boolean
  }
  theme: string
}

export interface ReactTreeContext extends ReactTreeState {
  selectNode: (nodeId: TreeNodeId) => void
  toggleOpenNode: (nodeId: TreeNodeId) => void
}
const _ReactTreeContext = React.createContext<ReactTreeContext>({
  nodes: [],
  selectedNodes: [],
  openNodes: [],
  options: {
    animations: false,
    lazy: false,
    showEmptyItems: false,
    noIcons: false
  },
  theme: 'light',
  selectNode: () => {},
  toggleOpenNode: () => {}
})

const ReactTreeContextProvider = ({
  children,
  nodes = [],
  defaultSelectedNodes = [],
  defaultOpenNodes = [],
  options = {
    animations: false,
    lazy: false,
    showEmptyItems: false,
    noIcons: false
  },
  theme = 'light',
  apiRef
}: React.PropsWithChildren<{
  nodes?: TreeNodeList
  defaultSelectedNodes?: TreeNodeId[]
  defaultOpenNodes?: TreeNodeId[]
  options?: {
    animations?: boolean
    lazy?: boolean
    showEmptyItems?: boolean
    noIcons?: boolean
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
    animations: boolean
    lazy: boolean
    showEmptyItems: boolean
    noIcons: boolean
  }>({
    animations: options.animations || false,
    lazy: options.lazy || false,
    showEmptyItems: options.showEmptyItems || false,
    noIcons: options.noIcons || false
  })

  const selectNode = React.useCallback(
    (nodeId: TreeNodeId) => {
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
    [selectedNodes]
  )

  const toggleOpenNode = React.useCallback(
    (nodeId: TreeNodeId) => {
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
    [openNodes]
  )

  React.useEffect(() => {
    setTreeNodeList(nodes)
  }, [nodes])

  React.useEffect(() => {
    setTreeConfig({
      animations: options.animations || false,
      lazy: options.lazy || false,
      showEmptyItems: options.showEmptyItems || false,
      noIcons: options.noIcons || false
    })
  }, [options])

  const value = React.useMemo(() => {
    return {
      nodes: nodeList,
      selectedNodes,
      openNodes,
      options: treeConfig,
      selectNode,
      toggleOpenNode,
      theme
    }
  }, [nodes, selectedNodes, openNodes, selectNode, toggleOpenNode, theme])

  // set up ref API
  if (apiRef) {
    apiRef.current = {
      getOpenNodes: () => openNodes,
      getSelectedNodes: () => selectedNodes,
      openNodes: nodes => {
        setOpenNodes(nList => {
          return Array.from(new Set(nList.concat(nodes)))
        })
      },
      closeNodes: nodes => {
        setOpenNodes(nList => {
          return nList.filter(n => !nodes.includes(n))
        })
      },
      selectNodes: nodes => {
        setSelectedNodes(nList => {
          return Array.from(new Set(nList.concat(nodes)))
        })
      },
      deselectNodes: nodes => {
        setSelectedNodes(nList => {
          return nList.filter(n => !nodes.includes(n))
        })
      }
    }
  }

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
