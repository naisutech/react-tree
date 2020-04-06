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
  selected: ?Node,
  onSelect: Function => void,
  currentTheme: string,
  showEmptyItems: boolean
}

const _Container = styled(motion.div)`
  min-width: 0;
`

const DropZone = styled(_Container)``

const Content = styled(_Container)``

const Children = styled(_Container)``


const Container = (props: Props) => {
  // PROPS
  const { nodes, parent, level, selected, onSelect, currentTheme, showEmptyItems} = props


  // get container items for this level and ancestors for next container
  const _containerItems = getChildrenByParent(nodes, parent)
  const _containerAncestors: Array<NodeList> = getAllAncestorsForCurrentContainers(
    nodes,
    _containerItems
  )

   // STATE
  const [_isOpen, _setIsOpen] = React.useState(Array(_containerItems.length).fill(false)) // keeping track of open folders


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
