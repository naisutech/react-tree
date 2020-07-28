// @flow

import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import LeafElement from './LeafElement'
import { Element } from './Elements'
import Wrapper from './Wrapper'
import Icon from './Icon'
import { NodeText } from './Text'
import type { Node, Leaf } from 'react-tree'

const IconWrapper = styled(motion.div)``

type Props = {
  data: Node,
  toggle: void => void,
  isOpen: boolean,
  isRoot: boolean,
  level: number,
  selected: ?Node,
  onSelect: Function => void,
  currentTheme: string,
  iconSet: Object | null,
  noIcons?: boolean
}

const NodeElement = (props: Props) => {
  const {
    data,
    isOpen,
    isRoot,
    toggle,
    onSelect,
    selected,
    level,
    currentTheme,
    iconSet,
    noIcons
  } = props
  if (props.data === null) {
    return null
  }

  return (
    <Element
      isOpen={isOpen}
      isRoot={isRoot}
      onClick={() => {
        toggle()
        onSelect(data)
      }}
      currentTheme={currentTheme}
      selected={selected && selected.id === data.id}
    >
      <Wrapper level={level}>
        {!noIcons && (
          <IconWrapper animate={{ rotate: isOpen ? 90 : 0 }}>
            <Icon
              size="large"
              icon={iconSet && iconSet['node'] ? iconSet['node'] : 'node'}
              currentTheme={currentTheme}
            ></Icon>
          </IconWrapper>
        )}

        <NodeText>{data.label}</NodeText>
      </Wrapper>
    </Element>
  )
}

NodeElement.defaultProps = {
  data: null,
  toggle: () => {},
  isOpen: false,
  isRoot: false,
  level: 0,
  selected: null,
  onSelect: () => {},
  currentTheme: 'dark',
  iconSet: null,
  noIcons: undefined
}

export default NodeElement
