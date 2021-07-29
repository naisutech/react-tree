/**
 * COMPONENTS AND LIBS
 */
import * as React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import styled, { ThemeProvider } from 'styled-components'
import Container from './Tree/Container'
import coreTheme from './styles/theme'
import Icon from './Tree/Icon'
import Icons from './assets/images/Icons'
export { NodeId, Leaf, LeafList, Node, NodeList, TreeProps, ToggleFunction, TreeRenderProps, ReactTreeTheme, ThemeSettings } from './Tree'
import { NodeId, NodeList, TreeProps, TreeRenderProps } from './Tree'

/**
 * Building blocks
 */
const DefaultLoaderIcon = Icons['loader']
const TreeBoundary = styled(m.div)<{ grow: boolean; currentTheme: string; size: string }>`
  display: flex;
  position: relative;
  flex-direction: column;
  ${(props) => (props.grow ? 'flex-grow: 1; height: 100%;' : '')};
  padding: 5px;
  overflow-y: auto;
  ${({ size, theme }) => {
    return `width: ${size && theme._app.containerSizes[size] ? theme._app.containerSizes[size] : 'unset'}`
  }};
  color: ${({ theme, currentTheme }) => theme._themes[currentTheme || 'dark'].text};
  background-color: ${({ theme, currentTheme }) => theme._themes[currentTheme || 'dark'].bg};

  & * {
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
    font-size: ${({ theme, currentTheme }) => theme._app.fontSizes[theme._themes[currentTheme || 'dark'].textSize]};
  }
`

const Message = styled(m.div)`
  align-self: center;
  margin: auto 0;
`

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
    children?: ({
      toggleNodeSelection,
      toggleSelectAllNodes,
      toggleOpenCloseNode,
      toggleOpenCloseAllNodes,
      selectedNodeIds,
      openNodeIds
    }: Partial<TreeRenderProps>) => React.ReactNode
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
  noIcons = false,
  children = () => {},
  isLoading = false,
  NodeRenderer = null,
  LeafRenderer = null,
  IconRenderer = null,
  animations = false,
  noDataString = null,
  loadingString = null,
  emptyItemsString = null
}) => {
  /**
   * We need to ensure that any changes to the content of the nodes list (create, delete)
   * re-renders the list and de-selects any selected nodes
   */
  const [internalNodes, setInternalNodes] = React.useState<NodeList>(nodes)
  const [selectedNodeIds, setSelectedNodeIds] = React.useState<NodeId[]>([])
  const [openNodeIds, setOpenNodeIds] = React.useState<NodeId[]>([])
  const treeRef = React.useRef<HTMLDivElement>(null)

  // listen to changes on nodes
  React.useEffect(() => {
    setInternalNodes(nodes)
  }, [nodes])

  /**
   * We should also be able to handle dynamic theme changes
   */
  const _theme = React.useMemo(() => {
    return {
      _themes: {
        ...coreTheme._themes,
        ...customTheme
      },
      _app: {
        ...coreTheme._app
      }
    }
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
    if (selectedNodeIds.length === 0) {
      setSelectedNodeIds(() => {
        const selection = internalNodes
          .map((el) => {
            return [el.id].concat(el.items ? el.items.map((i) => i.id) : [])
          })
          .flatMap((n) => n)
        onSelect(selection)
        return selection
      })
      return true
    }
    setSelectedNodeIds(() => {
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
      setOpenNodeIds(() => {
        const openIds = internalNodes.map((el) => el.id)
        onOpenClose(openIds)
        return openIds
      })
      return true
    }
    setOpenNodeIds(() => {
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

  const LoadingIcon =
    IconRenderer && typeof IconRenderer === 'function' ? (
      <Icon size="large">
        <IconRenderer label="loader" />
      </Icon>
    ) : (
      <Icon size="large" defaultIcon initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }}>
        <DefaultLoaderIcon />
      </Icon>
    )

  const content = !isLoading ? (
    <>
      {typeof children === 'function' &&
        children({
          toggleNodeSelection,
          toggleSelectAllNodes,
          toggleOpenCloseNode,
          toggleOpenCloseAllNodes,
          selectedNodeIds,
          openNodeIds
        })}
      {!nodes.length && (
        <Message>
          <span>{noDataString ? noDataString : 'No Data...'}</span>
        </Message>
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
          showEmptyItems={showEmptyItems}
          NodeRenderer={NodeRenderer}
          LeafRenderer={LeafRenderer}
          IconRenderer={IconRenderer}
          animations={animations}
          emptyItemsString={emptyItemsString}
        />
      )}
    </>
  ) : (
    <Message>
      <div style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
        <span style={{ paddingRight: '4px' }}>{loadingString ? loadingString : 'Loading...'}</span>
        {!loadingString && LoadingIcon}
      </div>
    </Message>
  )

  return (
    <ThemeProvider theme={_theme}>
      <LazyMotion features={domAnimation}>
        <TreeBoundary ref={treeRef} grow={grow} currentTheme={theme || 'dark'} size={size} style={{ ...containerStyle }}>
          {content}
        </TreeBoundary>
      </LazyMotion>
    </ThemeProvider>
  )
}

export default Tree
