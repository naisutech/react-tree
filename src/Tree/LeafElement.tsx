import { m } from 'framer-motion'
import * as React from 'react'
import { useTheme } from 'styled-components'
import Icons from '../assets/images/Icons'
import { ElementProps, NodeId } from '../Tree'
import { Element } from './Elements'
import Icon from './Icon'
import { NodeText } from './Text'
import Wrapper from './Wrapper'

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
      borderTop = false,
      animateSelection = true
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
      [data, didToggleSelect]
    )

    const userIcon = IconRenderer && typeof IconRenderer === 'function' ? IconRenderer({ data: data, type: 'leaf' }) : null
    const renderedIcon = userIcon ? (
      <Icon size="large" currentTheme={currentTheme}>
        {userIcon}
      </Icon>
    ) : (
      <Icon size={theme._themes[currentTheme || 'dark'].textSize} defaultIcon currentTheme={currentTheme}>
        <DefaultIcon />
      </Icon>
    )

    const content =
      typeof LeafRenderer === 'function' ? (
        <div title={data.tooltip || data.label} ref={ref} data-node-id={data.id} onClick={(e) => handleClick(e, data.id)}>
          {LeafRenderer({ data, selected, level })}
        </div>
      ) : (
        <div ref={ref}>
          <Element
            title={data.tooltip || data.label}
            borderTop={borderTop}
            data-node-id={data.id}
            selected={selected}
            currentTheme={currentTheme}
            onClick={(e) => handleClick(e, data.id)}
            animateSelection={animateSelection}
          >
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

const MotionLeafElement = m(LeafElement, { forwardMotionProps: true })

export default MotionLeafElement
