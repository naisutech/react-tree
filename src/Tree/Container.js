// @flow
import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import NodeElement from './NodeElement'
import LeafElement from './LeafElement'
import Wrapper from './Wrapper'
import { splitListByParent, toggleIsOpen } from '../lib/NodeList'
import type { NodeList, ContainerItems } from 'react-tree'

type Props = {
  nodes: NodeList,
  parent: ?string,
  level: number,
  selected: ?any,
  onSelect: ?any,
  darkMode: boolean
}

const _Container = styled(motion.div)``

const DropZone = styled(motion.div)``

const Content = styled(motion.div)``

const Children = styled(motion.div)``

const Empty = styled(motion.div)``

const Container = (props: Props) => {
  const [_isOpen, _setIsOpen] = React.useState([]) // keeping track of open folders

  // get container items for this level and remainder
  const containerItems: ContainerItems = splitListByParent(
    props.nodes,
    props.parent
  )

  // set up isOpen array on mount
  React.useEffect(() => {
    _setIsOpen(Array(containerItems.current.length).fill(false))
  }, [containerItems.current.length])

  return (
    <_Container
      className={[
        props.parent ? 'T-child-container' : 'T-root-container',
        'T-container'
      ].join(' ')}
    >
      <DropZone className="T-dropzone">
        {containerItems.current.length &&
          containerItems.current.map((i: Node, k: number) => {
            return (
              <Content
                className={[
                  'T-content',
                  !props.parent ? 'T-root' : 'T-sub'
                ].join(' ')}
                key={k}
              >
                <NodeElement
                  data={i}
                  toggle={() =>
                    toggleIsOpen(i, containerItems.current, _isOpen, _setIsOpen)
                  }
                  onSelect={props.onSelect}
                  isOpen={_isOpen[k]}
                  isRoot={!props.parent}
                  level={props.level}
                  selected={props.selected}
                  darkMode={props.darkMode}
                />
                {_isOpen[k] && (
                  <Children className="T-children">
                    {containerItems.other
                      .filter(o => o.parentId === i.id)
                      .map((o, l: number) => {
                        return (
                          <Container
                            parent={i.id}
                            nodes={containerItems.other}
                            level={props.level + 1}
                            key={l}
                            onSelect={props.onSelect}
                            selected={props.selected}
                            darkMode={props.darkMode}
                          />
                        )
                      })}

                    {i.items &&
                      i.items.map((child, l) => {
                        return (
                          <LeafElement
                            data={child}
                            key={l}
                            level={props.level}
                            onSelect={props.onSelect}
                            selected={props.selected}
                            darkMode={props.darkMode}
                          />
                        )
                      })}
                    {!i.items && (
                      <Empty className="T-empty">
                        <Wrapper level={props.level}>[empty]</Wrapper>
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
  darkMode: true
}

export default Container
