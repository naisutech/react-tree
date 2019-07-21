// @flow
import * as React from 'react'
import Container from './Tree/Container'
import './lib/FontAwesome.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles/Tree.scss' // https://github.com/facebook/flow/issues/338
import type { NodeList } from 'react-tree'

type Props = {
  nodes: NodeList,
  refresh: Function => NodeList,
  size: string,
  darkMode: boolean,
  onSelect: Function
}

const Tree = (props: Props) => {
  const [_nodeList, _setNodeList] = React.useState(null)
  const [_selected, _setSelected] = React.useState(null)

  // pass back to callee so they can refresh this component manually
  const _refresh = (): NodeList => {
    return props.refresh()
  }

  // select the node and call onSelect callback
  const selectNode = (selectedNode: any): void => {
    _setSelected(selectedNode)
    props.onSelect(selectedNode)
  }

  // deal with initialising nodelist
  React.useEffect(() => {
    if (props.nodes === null && typeof props.refresh === 'function') {
      // call refresh to get nodelist
      _setNodeList(props.refresh(_refresh))
      return
    }
    if (props.nodes) {
      _setNodeList(props.nodes)
    }
  }, [])

  return (
    <div
      className={[
        'Tree',
        props.size + '-width',
        props.darkMode ? 'T-dark' : 'T-light',
        props.nodes ? '' : 'T-loading'
      ].join(' ')}
    >
      {_nodeList && (
        <Container
          selected={_selected}
          onSelect={selectNode}
          parent={null}
          nodes={_nodeList}
          darkMode={props.darkMode}
        />
      )}
      {!_nodeList && (
        <div className="T-loader">
          <div className="T-spinner">
            <FontAwesomeIcon icon={'circle-notch'} spin size="lg" />
          </div>
        </div>
      )}
    </div>
  )
}

Tree.defaultProps = {
  nodes: null,
  refresh: () => {},
  size: 'full',
  darkMode: true,
  onSelect: () => {}
}

export default Tree
