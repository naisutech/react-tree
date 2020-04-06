// @flow

import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Wrapper from './Wrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Icon from './Icon'
import { NodeText } from './Text'
import { Element } from './Elements'
import type { Leaf, Node } from 'react-tree'

type Props = {
  data: Leaf,
  level: number,
  currentTheme: string,
  onSelect: Function => void,
  selected: ?Node
}

const LeafElement = (props: Props) => {
  const { data, level, onSelect, currentTheme, selected } = props
  return (
    <Element selected={selected && selected.id === data.id } currentTheme={currentTheme} onClick={() => onSelect(props.data)}>
      <Wrapper level={level + 1}>
        <Icon currentTheme={currentTheme}>
          <FontAwesomeIcon icon="paperclip" />
        </Icon>
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
  selected: null
}

export default LeafElement
