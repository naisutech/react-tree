import * as React from 'react'
import styled, { useTheme } from 'styled-components'
import { motion } from 'framer-motion'
import Wrapper from './Wrapper'
import { NodeText } from './Text'
import { Element } from './Elements'
import Icon from './Icon'
import Icons from '../assets/images/Icons'
import type { ElementProps, NodeId } from 'react-tree'

const LeafContainer = styled(Element)<Partial<ElementProps>>``

const DefaultIcon = Icons['file']

const LeafElement = React.forwardRef<HTMLDivElement, ElementProps>(
  (
    {
      data,
      selected = false,
      level = 0,
      currentTheme = 'dark',
      noIcons = false,
      didToggleSelect = () => {},
      LeafRenderer = null,
      IconRenderer = null,
      borderTop = false
    },
    ref
  ) => {
    if (data === null) {
      return null
    }

    const theme = useTheme()

    const handleClick = React.useCallback(
      (e: React.MouseEvent, nodeId: NodeId) => {
        didToggleSelect(nodeId, e.metaKey || e.ctrlKey)
      },
      [data]
    )

    const renderedIcon =
      IconRenderer && typeof IconRenderer === 'function' ? (
        <Icon size="large" currentTheme={currentTheme}>
          <IconRenderer label="leaf" />
        </Icon>
      ) : (
        <Icon size={theme[currentTheme || 'dark'].textSize} defaultIcon currentTheme={currentTheme}>
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
          <LeafContainer borderTop={borderTop} data-node-id={data.id} selected={selected} currentTheme={currentTheme} onClick={(e) => handleClick(e, data.id)}>
            <Wrapper level={level + 1}>
              {!noIcons && <span style={{ paddingRight: '8px' }}>{renderedIcon}</span>}

              <NodeText>{data.label}</NodeText>
            </Wrapper>
          </LeafContainer>
        </div>
      )

    return content
  }
)

const MotionLeafElement = motion(LeafElement, { forwardMotionProps: true })

export default MotionLeafElement
