import * as React from 'react'
import { motion } from 'framer-motion'
import Wrapper from './Wrapper'
import { NodeText } from './Text'
import { Element } from './Elements'
import Icon from './Icon'
import Icons from '../assets/images/Icons'
import type { ElementProps, NodeId } from 'react-tree'

const DefaultIcon = Icons['file']

const LeafElement = React.forwardRef<HTMLDivElement, ElementProps>(
  (
    { data, selected = false, level = 0, currentTheme = 'dark', noIcons = false, didToggleSelect = () => {}, LeafRenderer = null, IconRenderer = null },
    ref
  ) => {
    if (data === null) {
      return null
    }

    const handleClick = React.useCallback(
      (e: React.MouseEvent, nodeId: NodeId) => {
        didToggleSelect(nodeId, e.metaKey || e.ctrlKey)
      },
      [data]
    )

    const renderedIcon =
      IconRenderer && typeof IconRenderer === 'function' ? (
        <Icon size="large">
          <IconRenderer label="file" />
        </Icon>
      ) : (
        <Icon size="large" defaultIcon>
          <DefaultIcon />
        </Icon>
      )

    const content =
      typeof LeafRenderer === 'function' ? (
        <div ref={ref} data-node-id={data.id} onClick={(e) => handleClick(e, data.id)}>
          {LeafRenderer({ data, selected, level })}
        </div>
      ) : (
        <div ref={ref}>
          <Element data-node-id={data.id} selected={selected} currentTheme={currentTheme} onClick={(e) => handleClick(e, data.id)}>
            <Wrapper level={level + 1}>
              {!noIcons && <span style={{ paddingRight: '8px' }}>{renderedIcon}</span>}

              <NodeText>{data.label}</NodeText>
            </Wrapper>
          </Element>
        </div>
      )

    return content
  }
)

const MotionLeafElement = motion(LeafElement, { forwardMotionProps: true })

export default MotionLeafElement
