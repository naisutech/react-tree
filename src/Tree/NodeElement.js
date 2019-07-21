import * as React from 'react'
import LeafElement from './LeafElement'
import Wrapper from './Wrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSelectedClass } from '../lib/NodeList'
import type { Node, Leaf } from 'react-tree'

type Props = {
  data: Node,
  toggle: void => void,
  isOpen: boolean,
  isRoot: boolean,
  level: number,
  selected?: any,
  onSelect: ?any,
  darkMode: boolean
}

const NodeElement = (props: Props) => {
  if (props.data === null) {
    return null
  }

  const selectedClass = getSelectedClass(
    props.data,
    props.selected,
    props.darkMode
  )

  return (
    <div
      onClick={() => {
        props.toggle()
        props.onSelect(props.data)
      }}
      className={[
        'T-node',
        props.isOpen && props.isRoot ? 'T-open-node' : '',
        selectedClass
      ].join(' ')}
    >
      <Wrapper level={props.level}>
        <span className="T-icon">
          <FontAwesomeIcon
            icon={props.isOpen ? 'chevron-down' : 'chevron-right'}
          />
        </span>
        <span className="T-ntext">{props.data.label}</span>
      </Wrapper>
    </div>
  )
}

Node.defaultProps = {
  data: null,
  toggle: () => {},
  isOpen: false,
  isRoot: false,
  level: 0,
  selected: null,
  onSelect: () => {},
  darkMode: true
}

export default NodeElement
