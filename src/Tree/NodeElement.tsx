import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Element } from './Elements'
import Wrapper from './Wrapper'
import { NodeText } from './Text'
import type { ElementProps, NodeId } from 'react-tree'
import Icon from './Icon'
import Icons from '../assets/images/Icons'

const DefaultIcon = Icons['node']

const NodeElement = React.forwardRef<HTMLDivElement, ElementProps>(
  (
    {
      data,
      isOpen = false,
      isRoot = false,
      selected = false,
      level = 0,
      currentTheme = 'dark',
      noIcons = false,
      didToggleOpen = () => {},
      didToggleSelect = () => {},
      NodeRenderer = null,
      IconRenderer = null
    },
    ref
  ) => {
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

    const renderedIcon = React.useMemo(() => {
      return IconRenderer && typeof IconRenderer === 'function' ? (
        <Icon size="large">
          <IconRenderer label="file" />
        </Icon>
      ) : (
        <Icon size="large" defaultIcon animate={{ rotate: isOpen ? 90 : 0 }}>
          <DefaultIcon />
        </Icon>
      )
    }, [isOpen])

    const content =
      typeof NodeRenderer === 'function' ? (
        <div ref={ref} data-node-id={data.id} onClick={(e) => handleClick(e, data.id)}>
          {NodeRenderer({ data, isOpen, isRoot, selected, level })}
        </div>
      ) : (
        <div ref={ref}>
          <Element
            data-node-id={data.id}
            isOpen={isOpen}
            isRoot={isRoot}
            currentTheme={currentTheme}
            selected={selected}
            onClick={(e) => handleClick(e, data.id)}
          >
            <Wrapper level={level}>
              {!noIcons && <span style={{ paddingRight: '8px' }}>{renderedIcon}</span>}
              <NodeText>{data.label}</NodeText>
            </Wrapper>
          </Element>
        </div>
      )

    return content
  }
)

const MotionNodeElement = motion(NodeElement, { forwardMotionProps: true })

export default MotionNodeElement
