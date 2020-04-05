// @flow

import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import LeafElement from './LeafElement'
import Wrapper from './Wrapper'
import Icon from './Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSelectedClass } from '../lib/NodeList'
import { NodeText } from './Text'
import type { Node, Leaf } from 'react-tree'

type Props = {
  data: Node,
  toggle: void => void,
  isOpen: boolean,
  isRoot: boolean,
  level: number,
  selected?: any,
  onSelect: ?any,
  darkMode: boolean
}

const _NodeElement = styled.div``

const NodeElement = (props: Props) => {
  const { data, isOpen, isRoot } = props
  if (props.data === null) {
    return null
  }

  const selectedClass = getSelectedClass(
    props.data,
    props.selected,
    props.darkMode
  )

  return (
    <_NodeElement
      isOpen={isOpen}
      isRoot={isRoot}
      onClick={() => {
        props.toggle()
        props.onSelect(data)
      }}
    >
      <Wrapper level={props.level}>
        <Icon className="T-icon">
          <FontAwesomeIcon
            icon={props.isOpen ? 'chevron-down' : 'chevron-right'}
          />
        </Icon>
        <NodeText className="T-ntext">{props.data.label}</NodeText>
      </Wrapper>
    </_NodeElement>
  )
}

Node.defaultProps = {
  data: null,
  toggle: () => {},
  isOpen: false,
  isRoot: false,
  level: 0,
  selected: null,
  onSelect: () => {},
  darkMode: true
}

export default NodeElement
