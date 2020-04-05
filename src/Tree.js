// @flow

/**
 * COMPONENTS AND LIBS
 */
import * as React from 'react'
import { motion } from 'framer-motion'
import styled, { ThemeProvider } from 'styled-components'
import Container from './Tree/Container'
import './lib/FontAwesome.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NodeList } from 'react-tree'

// TYPES
type Props = {
  nodes: NodeList,
  fetch: Function => NodeList,
  size: string,
  darkMode: boolean,
  onSelect: Function
}

//STYLES
import theme from './styles/theme'
const _Tree = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 16px;
  font-weight: 300;
  font-family: sans-serif;
  padding: 5px;
  overflow-y: auto;
  width: ${props => {
    console.log(props)
    return props.size && props.theme.app.sizes[props.size]
      ? `${props.theme.app.sizes[props.size]};`
      : 'auto;'
  }}
    
  color: ${props =>
    props.darkMode ? props.theme.dark.text : props.theme.light.text};
  background-color: ${props =>
    props.darkMode ? props.theme.dark.bg : props.theme.light.bg};

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

const Tree = (props: Props) => {
  // PROPS
  const { darkMode, size, nodes, fetch, onSelect } = props

  // STATE
  const [_nodeList, _setNodeList] = React.useState(null)
  const [_selected, _setSelected] = React.useState(null)

  // pass back to callee so they can refresh this component manually
  const _refresh = (nodes: NodeList) => {
    _setNodeList(nodes)
  }

  // select the node and call onSelect callback
  const selectNode = (selectedNode: any): void => {
    _setSelected(selectedNode)
    onSelect(selectedNode)
  }

  // deal with initialising nodelist asynchronously, or via direct props
  React.useEffect(() => {
    if (props.nodes === null && typeof props.fetch === 'function') {
      // call refresh to get nodelist
      fetch(_refresh)
      return
    }
    if (props.nodes) {
      _setNodeList(nodes)
    }
  }, [])

  React.useEffect(() => {
    if (nodes && !!nodes.length) {
      _setNodeList(nodes)
    }
  }, [nodes])

  return (
    <ThemeProvider theme={theme}>
      <_Tree darkMode={darkMode} size={size}>
        {_nodeList && (
          <Container
            selected={_selected}
            onSelect={selectNode}
            parent={null}
            nodes={_nodeList}
            darkMode={props.darkMode}
          />
        )}
        {!_nodeList && (
          <Loader>
            <Spinner>
              <FontAwesomeIcon icon={'circle-notch'} spin size="lg" />
            </Spinner>
          </Loader>
        )}
      </_Tree>
    </ThemeProvider>
  )
}

Tree.defaultProps = {
  nodes: null,
  fetch: () => {},
  size: 'full',
  darkMode: false,
  onSelect: () => {}
}

export default Tree
