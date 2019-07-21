import * as React from 'react'
import Wrapper from './Wrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSelectedClass } from '../lib/NodeList'
import type { Leaf } from 'react-tree'

type Props = {
  data: Leaf,
  level: number,
  darkMode: boolean,
  onSelect: ?any,
  selected: ?any
}

const LeafElement = (props: Props) => {
  const selectedClass = getSelectedClass(
    props.data,
    props.selected,
    props.darkMode
  )

  return (
    <div
      onClick={() => props.onSelect(props.data)}
      className={['T-leaf', selectedClass].join(' ')}
    >
      <Wrapper level={props.level}>
        <span className="T-icon">
          <FontAwesomeIcon icon="paperclip" />
        </span>
        <span className="T-ltext">{props.data.label}</span>
      </Wrapper>
    </div>
  )
}

LeafElement.defaultProps = {
  data: {
    id: null,
    label: null,
    parent_id: null
  },
  level: 0,
  darkMode: true,
  onSelect: () => {},
  selected: null
}

export default LeafElement
