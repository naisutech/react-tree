// @flow

import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Wrapper from './Wrapper'
import Icon from './Icon'
import { NodeText } from './Text'
import { Element } from './Elements'
import type { Leaf, Node } from 'react-tree'

type Props = {
  data: Leaf,
  level: number,
  currentTheme: string,
  onSelect: Function => void,
  selected: ?Node,
  iconSet: Object | null,
  noIcons?: boolean
}

const LeafElement = (props: Props) => {
  const {
    data,
    level,
    onSelect,
    currentTheme,
    selected,
    iconSet,
    noIcons
  } = props
  return (
    <Element
      selected={selected && selected.id === data.id}
      currentTheme={currentTheme}
      onClick={(e) => onSelect(props.data, e)}
    >
      <Wrapper level={level + 1}>
        {!noIcons && (
          <Icon
            size="large"
            icon={iconSet && iconSet['file'] ? iconSet['file'] : 'file'}
            currentTheme={currentTheme}
          ></Icon>
        )}

        <NodeText>{data.label}</NodeText>
      </Wrapper>
    </Element>
  )
}

LeafElement.defaultProps = {
  data: {
    id: null,
    label: null,
    parent_id: null
  },
  level: 0,
  currentTheme: 'dark',
  onSelect: () => {},
  selected: null,
  iconSet: null,
  noIcons: undefined
}

export default LeafElement
