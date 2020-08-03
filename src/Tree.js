// @flow

/**
 * COMPONENTS AND LIBS
 */
import * as React from 'react'
import { motion } from 'framer-motion'
import styled, { ThemeProvider } from 'styled-components'
import Container from './Tree/Container'
import type { NodeList, ThemeSettings } from 'react-tree'
import Icon from './Tree/Icon'

// TYPES
type Props = {
  nodes: NodeList,
  size: string,
  onSelect: Function => void,
  isLoading: boolean,
  customTheme: ThemeSettings,
  theme: string,
  grow: boolean,
  showEmptyItems: boolean,
  iconSet: Object | null,
  noIcons: boolean,
  containerStyle?: Object
}

//STYLES
import coreTheme from './styles/theme'
const _Tree = styled(motion.div)`
  display: flex;
  flex-direction: column;
  ${props => (props.grow ? 'flex-grow: 1' : '')};
  padding: 5px;
  overflow-y: auto;
  width: ${props => {
    return props.size && props.theme.app.sizes[props.size]
      ? `${props.theme.app.sizes[props.size]};`
      : 'auto;'
  }}
    
  color: ${props => props.theme[props.currentTheme].text};
  background-color: ${props => props.theme[props.currentTheme].bg};

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
  const {
    size,
    nodes,
    isLoading,
    onSelect,
    customTheme,
    theme,
    grow,
    showEmptyItems,
    iconSet,
    noIcons,
    containerStyle
  } = props

  const [_theme, setTheme] = React.useState(
    Object.assign({}, customTheme, coreTheme)
  )

  // STATE
  const _nodeList = React.useRef(nodes).current
  const [_selected, _setSelected] = React.useState(null)

  // select the node and call onSelect callback
  const selectNode = (selectedNode: any, e: any): void => {
    _setSelected(selectedNode)
    onSelect(selectedNode, e)
  }

  return (
    <ThemeProvider theme={_theme}>
      <_Tree
        grow={grow}
        currentTheme={theme || 'dark'}
        size={size}
        style={{ ...containerStyle }}
      >
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
            {!noIcons && (
              <Icon
                size="xlarge"
                spin
                currentTheme={theme || 'dark'}
                icon={
                  iconSet && iconSet['loader'] ? iconSet['loader'] : 'loader'
                }
              />
            )}
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
