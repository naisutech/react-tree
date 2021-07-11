/**
 * COMPONENTS AND LIBS
 */
import * as React from 'react'
import { motion } from 'framer-motion'
import styled, { ThemeProvider } from 'styled-components'
import Container from './Tree/Container'
import type { TreeProps, NodeList, ThemeSettings } from 'react-tree'
import coreTheme from './styles/theme'
import Icon from './Tree/Icon'

//STYLES

const _Tree = styled(motion.div)<TreeProps>`
  display: flex;
  flex-direction: column;
  ${(props) => (props.grow ? 'flex-grow: 1' : '')};
  padding: 5px;
  overflow-y: auto;
  width: ${(props) => {
    return props.size && props.theme.app.sizes[props.size] ? `${props.theme.app.sizes[props.size]};` : 'auto'
  }};
  color: ${(props) => props.theme[props.currentTheme].text};
  background-color: ${(props) => props.theme[props.currentTheme].bg};

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

const Tree = ({ nodes, customTheme, theme, grow, onSelect = (id) => {}, ...props }: TreeProps) => {
  /**
   * We need to ensure that any changes to the content of the nodes list (create, delete)
   * re-renders the list and de-selects any selected nodes
   */
  const [internalNodes, setInternalNodes] = React.useState(nodes)
  const [selectedNodeIds, setSelectedNodeIds] = React.useState<number | string[]>([])

  // listen to changes on nodes
  React.useEffect(() => {
    setInternalNodes(nodes)
  }, [nodes])

  // listen to changes on internalNodes
  React.useEffect(() => {
    setSelectedNodeIds([])
  }, [internalNodes])

  /**
   * We should also be able to handle dynamic theme changes
   */
  const [_theme, setTheme] = React.useState(Object.assign({}, customTheme, coreTheme))

  React.useEffect(() => {
    setTheme(Object.assign({}, customTheme, coreTheme))
  }, [customTheme])

  // select the node and call onSelect callback
  const selectNode = (selectedNodeId: number | string): void => {
    const nextSelectedValue = [selectedNodeId]
    setSelectedNodeIds(nextSelectedValue)
    onSelect(selectedNode)
  }

  const toggleSelectAllNodes = (): void => {}

  return (
    <ThemeProvider theme={_theme}>
      <_Tree grow={grow} currentTheme={theme || 'dark'} size={size} style={{ ...containerStyle }}>
        {!!nodes.length && (
          <Container
            selected={_selected}
            onSelect={selectNode}
            parent={null}
            nodes={nodes}
            currentTheme={theme || 'dark'}
            noIcons={noIcons}
            iconSet={iconSet}
            showEmptyItems={showEmptyItems}
          />
        )}
        {!isLoading && !nodes.length && (
          <Loader>
            <p>No data :(</p>
          </Loader>
        )}
        {isLoading && (
          <Loader>
            {!noIcons && <Icon size="xlarge" spin currentTheme={theme || 'dark'} icon={iconSet && iconSet['loader'] ? iconSet['loader'] : 'loader'} />}
          </Loader>
        )}
      </_Tree>
    </ThemeProvider>
  )
}

Tree.defaultProps = {
  nodes: [],
  size: 'full',
  isLoading: false,
  onSelect: () => {},
  customTheme: {
    dark: {
      text: '#fafafa',
      bg: '#2d3439',
      highlight: '#3f464e'
    }
  },
  theme: 'dark',
  grow: false,
  showEmptyItems: false,
  iconSet: null,
  noIcons: false,
  containerStyle: undefined
}

export default Tree
