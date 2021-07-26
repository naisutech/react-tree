import type { Node, NodeList } from '../Tree'

export const getDescendantByParent = (nodes: NodeList, currentContainer: Node): NodeList => {
  const foundList: any[] = []
  const search = (currentParent: string | number) => {
    nodes.forEach((n) => {
      if (!foundList.includes(n.id) && n.parentId === currentParent && n.id !== currentParent) {
        foundList.push(n.id)
        search(n.id)
      }
    })
  }
  search(currentContainer.id)

  return nodes.filter((n) => foundList.includes(n.id))
}

export const getAllDescendantsForCurrentContainers = (nodeList: NodeList, containerItems: NodeList): Array<NodeList> => {
  return containerItems.map((parent) => {
    return getDescendantByParent(nodeList, parent)
  })
}

export const getChildrenByParent = (nodes: NodeList, parentId: number | string | null = null): NodeList => {
  return nodes.filter((n) => n.parentId === parentId)
}
