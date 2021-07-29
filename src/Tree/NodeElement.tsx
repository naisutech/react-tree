import * as React from 'react'
import styled, { useTheme } from 'styled-components'
import { m } from 'framer-motion'
import { Element } from './Elements'
import Wrapper from './Wrapper'
import { NodeText } from './Text'
import { ElementProps, NodeId } from '../Tree'
import Icon from './Icon'
import Icons from '../assets/images/Icons'

const NodeContainer = styled(Element)<{ currentTheme: string; isOpen: boolean }>`
  border-left: ${({ isOpen, theme, currentTheme }) => (isOpen ? `4px solid ${theme._themes[currentTheme || 'dark'].indicator}` : '4px solid transparent')};
  transition: all 0.2s linear;
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
        if (!e.metaKey && !e.ctrlKey) {
          didToggleOpen(nodeId, true)
        }
      },
      [data]
    )

    const renderedIcon = React.useMemo(() => {
      return IconRenderer && typeof IconRenderer === 'function' ? (
        <Icon size="large" currentTheme={currentTheme}>
          <IconRenderer label="node" />
        </Icon>
      ) : (
        <Icon size={theme._themes[currentTheme || 'dark'].textSize} currentTheme={currentTheme} defaultIcon animate={{ rotate: isOpen ? 90 : 0 }}>
          <DefaultIcon />
        </Icon>
      )
    }, [isOpen])

    const content =
      typeof NodeRenderer === 'function' ? (
        <div title={data.label} ref={ref} data-node-id={data.id} onClick={(e) => handleClick(e, data.id)}>
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
            title={data.label}
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
