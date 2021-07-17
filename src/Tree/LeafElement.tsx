import * as React from 'react'
import Wrapper from './Wrapper'
import { NodeText } from './Text'
import { Element } from './Elements'
import type { ElementProps, NodeId } from 'react-tree'

const LeafElement: React.FC<ElementProps> = ({
  data,
  selected = false,
  level = 0,
  currentTheme = 'dark',
  iconSet = null,
  noIcons = false,
  didToggleSelect = () => {},
  leafRenderer = null
}) => {
  if (data === null) {
    return null
  }

  const handleClick = React.useCallback(
    (e: React.MouseEvent, nodeId: NodeId) => {
      didToggleSelect(nodeId, e.metaKey || e.ctrlKey)
    },
    [data]
  )

  const content =
    typeof leafRenderer === 'function' ? (
      <div data-node-id={data.id} onClick={(e) => handleClick(e, data.id)}>
        {leafRenderer({ data, selected, level })}
      </div>
    ) : (
      <Element data-node-id={data.id} selected={selected} currentTheme={currentTheme} onClick={(e) => handleClick(e, data.id)}>
        <Wrapper level={level + 1}>
          {/* {!noIcons && <Icon size="large" icon={iconSet && iconSet['file'] ? iconSet['file'] : 'file'} currentTheme={currentTheme}></Icon>} */}

          <NodeText>{data.label}</NodeText>
        </Wrapper>
      </Element>
    )

  return content
}

export default LeafElement
