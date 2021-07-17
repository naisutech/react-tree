/**
 * COMPONENTS AND LIBS
 */
import * as React from 'react'
import { motion } from 'framer-motion'
import styled, { ThemeProvider } from 'styled-components'
import { TreeProps, InternalTreeProps, NodeList, NodeId, TreeRenderProps } from 'react-tree'
import Container from './Tree/Container'
import coreTheme from './styles/theme'

/**
 * Building blocks
 */
const TreeBoundary = styled(motion.div)<Partial<InternalTreeProps> & { style: React.CSSProperties }>`
  display: flex;
  flex-direction: column;
  ${(props) => (props.grow ? 'flex-grow: 1; height: 100%;' : '')};
  padding: 5px;
  overflow-y: auto;
  width: ${(props) => {
    return props.size && props.theme._app.sizes[props.size] ? `${props.theme._app.sizes[props.size]};` : 'auto'
  }};
  color: ${(props) => props.theme[props.currentTheme || 'dark'].text};
  background-color: ${(props) => props.theme[props.currentTheme || 'dark'].bg};

  & * {
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
  }
`

const Loader = styled(motion.div)`
  align-self: center;
  margin: auto 0;
`

const Spinner = styled(motion.div)``

const genericStateToggler = (
  stateSetter: React.Dispatch<React.SetStateAction<NodeId[]>>,
  callback: (nodeIds: NodeId[]) => void,
  nodeId: NodeId,
  multi: boolean = false
): void => {
  stateSetter((p) => {
    let _p = p.slice()
    const toggledIndex = _p.findIndex((id) => id === nodeId)

    // in case of select, which might be single or multi
    // handle single select
    if (!multi) {
      let result = [nodeId]
      if (toggledIndex != -1) {
        result = []
      }
      callback(result)
      return result
    }

    // handle multi select (which is default for open/close toggle)
    if (toggledIndex !== -1) {
      _p = _p.filter((id) => id !== nodeId)
    } else {
      _p.push(nodeId)
    }
    callback(_p)
    return _p
  })
}

const Tree: React.FC<
  TreeProps & {
    children?: ({ toggleNodeSelection, toggleSelectAllNodes, toggleOpenCloseNode, toggleOpenCloseAllNodes }: Partial<TreeRenderProps>) => React.ReactNode
  }
> = ({
  nodes = [],
  customTheme = {},
  theme = 'dark',
  size = 'full',
  grow = false,
  onSelect = () => {},
  onOpenClose = () => {},
  containerStyle = {},
  showEmptyItems = false,
  iconSet = null,
  noIcons = false,
  children = () => {},
  isLoading = false,
  nodeRenderer = null,
  leafRenderer = null
}) => {
  /**
   * We need to ensure that any changes to the content of the nodes list (create, delete)
   * re-renders the list and de-selects any selected nodes
   */
  const [internalNodes, setInternalNodes] = React.useState<NodeList>(nodes)
  const [selectedNodeIds, setSelectedNodeIds] = React.useState<NodeId[]>([])
  const [openNodeIds, setOpenNodeIds] = React.useState<NodeId[]>([])
  const treeRef = React.useRef<HTMLElement>(null)

  // listen to changes on nodes
  React.useEffect(() => {
    setInternalNodes(nodes)
  }, [nodes])

  /**
   * We should also be able to handle dynamic theme changes
   */
  const _theme = React.useMemo(() => {
    return Object.assign({}, customTheme, coreTheme)
  }, [customTheme])

  /**
   * Handlers
   * We need a handler for:
   * 1. Handling a single select toggle
   * 2. Handling a ALL select toggle
   * 3. Toggling an open node
   * 4. Toggling all nodes open/closed
   */

  // 1. Handling a single select toggle
  const toggleNodeSelection = genericStateToggler.bind(null, setSelectedNodeIds, onSelect)

  // 2. Handling a ALL select toggle
  const toggleSelectAllNodes = (): boolean => {
    // TODO: make sure that this selects even leaf nodes
    if (selectedNodeIds.length !== internalNodes.length) {
      setSelectedNodeIds((p) => {
        const selection = internalNodes.map((el) => el.id)
        onSelect(selection)
        return selection
      })
      return true
    }
    setSelectedNodeIds((p) => {
      onSelect([])
      return []
    })
    return false
  }

  // 3. Toggling an open node
  const toggleOpenCloseNode = genericStateToggler.bind(null, setOpenNodeIds, onOpenClose)

  // 4. Toggling all nodes open/closed
  const toggleOpenCloseAllNodes = (): boolean => {
    if (openNodeIds.length !== internalNodes.length) {
      setOpenNodeIds((p) => {
        const openIds = internalNodes.map((el) => el.id)
        onOpenClose(openIds)
        return openIds
      })
      return true
    }
    setOpenNodeIds((p) => {
      onOpenClose([])
      return []
    })
    return false
  }

  /**
   * Finally we need to set up a listener to deselect any nodes if there is a click outside of the selected tree
   */
  React.useEffect(() => {
    const isOutsideClick = (e: MouseEvent) => {
      if (!treeRef?.current?.contains(e.target as Node)) {
        // must be outside of the tree
        onSelect([])
        setSelectedNodeIds([])
      }
    }

    if (!window) return
    window.addEventListener('click', isOutsideClick)
    return () => {
      if (!window) return
      window.removeEventListener('click', isOutsideClick)
    }
  }, [])

  const content = !isLoading ? (
    <>
      {typeof children === 'function' &&
        children({
          toggleNodeSelection,
          toggleSelectAllNodes,
          toggleOpenCloseNode,
          toggleOpenCloseAllNodes
        })}
      {!nodes.length && (
        <div>
          <span>No Data 😔</span>
        </div>
      )}
      {!!nodes.length && (
        <Container
          selectedNodes={selectedNodeIds}
          openNodes={openNodeIds}
          didToggleSelect={toggleNodeSelection}
          didToggleOpen={toggleOpenCloseNode}
          parent={null}
          nodes={nodes}
          currentTheme={theme || 'dark'}
          noIcons={noIcons}
          iconSet={iconSet}
          showEmptyItems={showEmptyItems}
          nodeRenderer={nodeRenderer}
          leafRenderer={leafRenderer}
        />
      )}
    </>
  ) : (
    <Loader>
      <div>Loading... 🌀</div>
    </Loader>
  )

  return (
    <ThemeProvider theme={_theme}>
      <TreeBoundary ref={treeRef} grow={grow} currentTheme={theme || 'dark'} size={size} style={{ ...containerStyle }}>
        {content}
      </TreeBoundary>
    </ThemeProvider>
  )
}

export default Tree
