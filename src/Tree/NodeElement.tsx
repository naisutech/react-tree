import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Element } from './Elements'
import Wrapper from './Wrapper'
import { NodeText } from './Text'
import type { ElementProps, NodeId } from 'react-tree'

const IconWrapper = styled(motion.div)``

const NodeElement: React.FC<ElementProps> = ({
  data,
  isOpen = false,
  isRoot = false,
  selected = false,
  level = 0,
  currentTheme = 'dark',
  iconSet = null,
  noIcons = false,
  didToggleOpen = () => {},
  didToggleSelect = () => {},
  nodeRenderer = null
}) => {
  if (data === null) {
    return null
  }

  const handleClick = React.useCallback(
    (e: React.MouseEvent, nodeId: NodeId) => {
      didToggleSelect(nodeId, e.metaKey || e.ctrlKey)
      if (!e.metaKey && !e.ctrlKey) {
        didToggleOpen(nodeId, true)
      }
    },
    [data]
  )

  const content =
    typeof nodeRenderer === 'function' ? (
      <div data-node-id={data.id} onClick={(e) => handleClick(e, data.id)}>
        {nodeRenderer({ data, isOpen, isRoot, selected, level })}
      </div>
    ) : (
      <Element data-node-id={data.id} isOpen={isOpen} isRoot={isRoot} currentTheme={currentTheme} selected={selected} onClick={(e) => handleClick(e, data.id)}>
        <Wrapper level={level}>
          {/* {!noIcons && (
          <IconWrapper animate={{ rotate: isOpen ? 90 : 0 }}>
            <Icon size="large" icon={iconSet && iconSet['node'] ? iconSet['node'] : 'node'} currentTheme={currentTheme}></Icon>
          </IconWrapper>
        )} */}
          <NodeText>{data.label}</NodeText>
        </Wrapper>
      </Element>
    )

  return content
}

export default NodeElement
