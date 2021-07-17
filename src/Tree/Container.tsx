import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import NodeElement from './NodeElement'
import LeafElement from './LeafElement'
import { Empty } from './Elements'
import Wrapper from './Wrapper'
import { getChildrenByParent, getAllDescendantsForCurrentContainers } from '../lib/NodeList'
import type { ContainerProps, NodeList, Node, NodeId } from 'react-tree'

const ContainerWrapper = styled(motion.div)<{ parent?: NodeId | null }>`
  min-width: 0;
`

const DropZone = styled(ContainerWrapper)``

const Content = styled(ContainerWrapper)``

const Children = styled(ContainerWrapper)``

/**
 * At every level of the tree, we have a container. The container is a recursive wrapper component which can contain
 * - 1 or more NODES
 * - 0 or more LEAVES
 *
 * Always render the children nodes first, and then the leaf node collection after
 */
const Container: React.FC<ContainerProps> = ({
  nodes = [],
  parent = null,
  level = 0,
  selectedNodes = [],
  openNodes = [],
  didToggleSelect = () => {},
  didToggleOpen = () => {},
  currentTheme = 'dark',
  showEmptyItems = false,
  iconSet = null,
  noIcons = false,
  nodeRenderer = null,
  leafRenderer = null
}) => {
  // get container items for this level and ancestors for next container
  const containerItems = React.useMemo(() => {
    return getChildrenByParent(nodes || [], parent)
  }, [nodes, parent])

  const containerDescendants: NodeList[] = React.useMemo(() => {
    return getAllDescendantsForCurrentContainers(nodes || [], containerItems)
  }, [containerItems])

  return (
    <ContainerWrapper parent={parent}>
      <DropZone>
        {!!containerItems.length &&
          containerItems.map((item: Node, k: number) => {
            return (
              <Content key={k}>
                <NodeElement
                  data={item}
                  isOpen={openNodes.includes(item.id)}
                  selected={selectedNodes.includes(item.id)}
                  isRoot={!parent}
                  level={level}
                  currentTheme={currentTheme}
                  noIcons={noIcons}
                  iconSet={iconSet}
                  didToggleOpen={didToggleOpen}
                  didToggleSelect={didToggleSelect}
                  nodeRenderer={nodeRenderer}
                />
                {openNodes.includes(item.id) && (
                  <Children>
                    <Container
                      nodes={containerDescendants[k]}
                      parent={item.id}
                      level={level + 1}
                      selectedNodes={selectedNodes}
                      openNodes={openNodes}
                      didToggleSelect={didToggleSelect}
                      didToggleOpen={didToggleOpen}
                      currentTheme={currentTheme}
                      showEmptyItems={showEmptyItems}
                      noIcons={noIcons}
                      iconSet={iconSet}
                      nodeRenderer={nodeRenderer}
                      leafRenderer={leafRenderer}
                    />
                    {item.items &&
                      item.items.map((child, l) => {
                        return (
                          <LeafElement
                            key={l}
                            data={child}
                            level={level}
                            currentTheme={currentTheme}
                            noIcons={noIcons}
                            iconSet={iconSet}
                            selected={selectedNodes.includes(child.id)}
                            leafRenderer={leafRenderer}
                            didToggleSelect={didToggleSelect}
                          />
                        )
                      })}
                    {showEmptyItems && !item.items && (
                      <Empty currentTheme={currentTheme}>
                        <Wrapper level={level + 1}>[No items]</Wrapper>
                      </Empty>
                    )}
                  </Children>
                )}
              </Content>
            )
          })}
      </DropZone>
    </ContainerWrapper>
  )
}

export default Container
