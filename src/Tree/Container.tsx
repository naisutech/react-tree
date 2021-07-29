import * as React from 'react'
import styled from 'styled-components'
import { m } from 'framer-motion'
import NodeElement from './NodeElement'
import LeafElement from './LeafElement'
import { Empty } from './Elements'
import Wrapper from './Wrapper'
import { getChildrenByParent, getAllDescendantsForCurrentContainers } from '../lib/NodeList'
import type { ContainerProps, NodeList, Node } from '../Tree'

const ContainerWrapper = styled(m.div)`
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
  noIcons = false,
  NodeRenderer = null,
  LeafRenderer = null,
  IconRenderer = null,
  animations = false,
  emptyItemsString = null
}) => {
  // get container items for this level and ancestors for next container
  const containerItems = React.useMemo(() => {
    return getChildrenByParent(nodes || [], parent)
  }, [nodes, parent])

  const containerDescendants: NodeList[] = React.useMemo(() => {
    return getAllDescendantsForCurrentContainers(nodes || [], containerItems)
  }, [containerItems])

  const animationsSpec = animations
    ? {
        initial: { opacity: 0, y: -25 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 }
      }
    : {}

  return (
    <ContainerWrapper>
      <DropZone>
        {!!containerItems.length &&
          containerItems.map((item: Node, k: number) => {
            return (
              <Content key={k} {...animationsSpec} transition={{ delay: 0.1 * k }}>
                <NodeElement
                  data={item}
                  isOpen={openNodes.includes(item.id)}
                  selected={selectedNodes.includes(item.id)}
                  isRoot={!parent}
                  level={level}
                  currentTheme={currentTheme}
                  noIcons={noIcons}
                  didToggleOpen={didToggleOpen}
                  didToggleSelect={didToggleSelect}
                  NodeRenderer={NodeRenderer}
                  IconRenderer={IconRenderer}
                  borderTop={(!parent && k !== 0) || !!parent}
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
                      NodeRenderer={NodeRenderer}
                      LeafRenderer={LeafRenderer}
                      IconRenderer={IconRenderer}
                      animations={animations}
                      emptyItemsString={emptyItemsString}
                    />
                    {item.items &&
                      item.items.map((child, l) => {
                        return (
                          <LeafElement
                            key={l}
                            {...animationsSpec}
                            transition={{ delay: 0.1 * k + 0.1 * (l + 1) }}
                            data={child}
                            level={level}
                            currentTheme={currentTheme}
                            noIcons={noIcons}
                            selected={selectedNodes.includes(child.id)}
                            LeafRenderer={LeafRenderer}
                            IconRenderer={IconRenderer}
                            didToggleSelect={didToggleSelect}
                            borderTop
                          />
                        )
                      })}
                    {showEmptyItems && !item.items && (
                      <Empty currentTheme={currentTheme} borderTop selected={false}>
                        <Wrapper level={level + 1}>
                          <span>{emptyItemsString ? emptyItemsString : '[No items]'}</span>
                        </Wrapper>
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
