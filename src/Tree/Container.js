// @flow
import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import NodeElement from './NodeElement'
import LeafElement from './LeafElement'
import { Empty } from './Elements'
import Wrapper from './Wrapper'
import {
  getChildrenByParent,
  getAllAncestorsForCurrentContainers
} from '../lib/NodeList'
import type { NodeList, ContainerItems, Node } from 'react-tree'

type Props = {
  nodes: NodeList,
  parent: ?string | ?number,
  level: number,
  selected: ?any,
  onSelect: Function => void,
  currentTheme: string,
  showEmptyItems: boolean
}

const _Container = styled(motion.div)``

const DropZone = styled(motion.div)``

const Content = styled(motion.div)``

const Children = styled(motion.div)``


const Container = (props: Props) => {
  // PROPS
  const { nodes, parent, level, selected, onSelect, currentTheme, showEmptyItems} = props


  console.log('nodes', nodes)

  // get container items for this level and remainder
  const _containerItems = getChildrenByParent(nodes, parent)
  const _containerAncestors: Array<NodeList> = getAllAncestorsForCurrentContainers(
    nodes,
    _containerItems
  )

   // STATE
  const [_isOpen, _setIsOpen] = React.useState(Array(_containerItems.length).fill(false)) // keeping track of open folders

  console.log("**** LEVEL "  + level + " *****")
  console.log({
    _containerItems,
    _containerAncestors
  })


  return (
    <_Container parent={parent}>
      <DropZone>
        {!!_containerItems.length &&
          _containerItems.map((item: Node, k: number) => {
            return (
              <Content key={k}>
                <NodeElement
                  data={item}
                  toggle={() =>
                    _setIsOpen(o => {
                      const _o = o.slice()
                      _o[k] = !_o[k]
                      return _o
                    })
                  }
                  onSelect={onSelect}
                  isOpen={_isOpen[k]}
                  isRoot={!parent}
                  level={level}
                  selected={selected}
                  currentTheme={currentTheme}
                />
                {_isOpen[k] && (
                  <Children>
                    <Container
                      parent={item.id}
                      nodes={_containerAncestors[k]}
                      level={level + 1}
                      onSelect={onSelect}
                      selected={selected}
                      currentTheme={currentTheme}
                      showEmptyItems={showEmptyItems}
                    />
                    {item.items &&
                      item.items.map((child, l) => {
                        return (
                          <LeafElement
                            data={child}
                            key={l}
                            level={level}
                            onSelect={onSelect}
                            selected={selected}
                            currentTheme={currentTheme}
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
    </_Container>
  )
}

Container.defaultProps = {
  nodes: [],
  parent: null,
  level: 0,
  selected: null,
  onSelect: () => {},
  currentTheme: 'dark',
  showEmptyItems: false
}

export default Container
