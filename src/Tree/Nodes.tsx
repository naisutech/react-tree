import * as React from 'react'
import { useTheme } from 'styled-components'
import { TreeNodeId } from 'Tree'
import ReactTreeContext from './Context'
import { UniversalNode, UniversalNodeContainer } from './Elements'

export const AnyNode = ({
  parentId = null,
  depth = 0
}: {
  parentId?: TreeNodeId | null
  depth?: number
}) => {
  const options = useTheme()
  // import all nodes
  const { nodes, openNodes, selectedNodes, toggleOpenNode, theme } =
    ReactTreeContext.useReactTreeContext()

  const theseNodes = React.useMemo(() => {
    return nodes.filter(n => n.parentId === parentId)
  }, [nodes])

  const theseNodesOpen = React.useMemo(() => {
    return theseNodes.map(n => openNodes.includes(n.id))
  }, [openNodes])

  const theseNodesSelected = React.useMemo(() => {
    return theseNodes.map(n => selectedNodes.includes(n.id))
  }, [selectedNodes])

  const handleToggleOpenNode = (nodeId: TreeNodeId) => {
    toggleOpenNode(nodeId)
  }

  const currentTheme = options.themes[theme]
  console.log({ nodes, openNodes, theseNodes, parentId, depth, theseNodesOpen })

  return (
    <UniversalNodeContainer $indent={depth}>
      {theseNodes.map((n, i) => {
        return (
          <UniversalNodeContainer
            key={n.id}
            $selected={theseNodesSelected[i]}
            onClick={e => {
              e.stopPropagation()
              handleToggleOpenNode(n.id)
            }}
          >
            <UniversalNode $height={currentTheme.nodeHeight}>
              {n.label}
            </UniversalNode>
            {theseNodesOpen[i] && (
              <UniversalNodeContainer>
                {[
                  <AnyNode
                    key={n.id + '' + depth}
                    parentId={n.id}
                    depth={depth + 1}
                  />,
                  n.items?.map(item => {
                    return (
                      <UniversalNode
                        key={item.id}
                        $height={currentTheme.nodeHeight}
                        $indent={depth + 1}
                      >
                        {item.label}
                      </UniversalNode>
                    )
                  })
                ]}
              </UniversalNodeContainer>
            )}
          </UniversalNodeContainer>
        )
      })}
    </UniversalNodeContainer>
  )
}
