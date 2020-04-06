// @flow
import type { Node, NodeList, ContainerItems } from 'react-tree'

export const getAncestorsByParent: Function = (
  nodes: NodeList,
  currentContainer: Node
): NodeList => {
  const foundList: any[] = []
  const search = currentParent => {
    nodes.forEach(n => {
      if (
        !foundList.includes(n.id) &&
        n.parentId === currentParent &&
        n.id !== currentParent
      ) {
        foundList.push(n.id)
        search(n.id)
      }
    })
  }
  search(currentContainer.id)

  return nodes.filter(n => foundList.includes(n.id))
}

export const getAllAncestorsForCurrentContainers = (
  nodeList: NodeList,
  containerItems: NodeList
): Array<NodeList> => {
  return containerItems.map(parent => {
    return getAncestorsByParent(nodeList, parent)
  })
}

export const getChildrenByParent = (
  nodes: NodeList,
  parentId: ?number | ?string
): NodeList => {
  return nodes.filter(n => n.parentId === parentId)
}
