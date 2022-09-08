import { m } from 'framer-motion'
import * as React from 'react'
import styled, { useTheme } from 'styled-components'
import Icons from '../assets/images/Icons'
import { ElementProps, NodeId } from '../Tree'
import { Element } from './Elements'
import Icon from './Icon'
import { NodeText } from './Text'
import Wrapper from './Wrapper'

const NodeContainer = styled(Element)<{ currentTheme: string; isOpen: boolean; animations?: boolean }>`
  border-left: ${({ isOpen, theme, currentTheme }) => (isOpen ? `4px solid ${theme._themes[currentTheme || 'dark'].indicator}` : '4px solid transparent')};
  ${({ animations }) => (animations ? 'transition: all 0.2s linear;' : '')}
`

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
      IconRenderer = null,
      borderTop = false,
      selectable = true,
      animateSelection = false
    },
    ref
  ) => {
    if (data === null) {
      return null
    }

    const theme = useTheme()

    const handleClick = React.useCallback(
      (e: React.MouseEvent, nodeId: NodeId) => {
        const multi = e.metaKey || e.ctrlKey
        if (selectable) didToggleSelect(nodeId, multi)
        if (!multi) {
          didToggleOpen(nodeId, true)
        }
      },
      [data, didToggleSelect]
    )

    const renderedIcon = React.useMemo(() => {
      const userIcon = IconRenderer && typeof IconRenderer === 'function' ? IconRenderer({ data: data, type: 'node' }) : null
      return userIcon ? (
        <Icon size="large" currentTheme={currentTheme}>
          {userIcon}
        </Icon>
      ) : (
        <Icon
          size={theme._themes[currentTheme || 'dark'].textSize}
          currentTheme={currentTheme}
          rotate={!animateSelection && isOpen ? 90 : undefined}
          defaultIcon
          animate={animateSelection ? { rotate: isOpen ? 90 : 0 } : undefined}
        >
          <DefaultIcon />
        </Icon>
      )
    }, [isOpen])

    const content =
      typeof NodeRenderer === 'function' ? (
        <div title={data.tooltip || data.label} ref={ref} data-node-id={data.id} onClick={(e) => handleClick(e, data.id)}>
          {NodeRenderer({ data, isOpen, isRoot, selected, level })}
        </div>
      ) : (
        <div ref={ref}>
          <NodeContainer
            data-node-id={data.id}
            isOpen={isOpen}
            currentTheme={currentTheme}
            selected={selected}
            onClick={(e) => handleClick(e, data.id)}
            borderTop={borderTop}
            title={data.tooltip || data.label}
          >
            <Wrapper level={level}>
              {!noIcons && <span style={{ paddingRight: '8px' }}>{renderedIcon}</span>}
              <NodeText>{data.label}</NodeText>
            </Wrapper>
          </NodeContainer>
        </div>
      )

    return content
  }
)

const MotionNodeElement = m(NodeElement, { forwardMotionProps: true })

export default MotionNodeElement
