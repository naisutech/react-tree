import type { TreeNode, TreeNodeList } from '../Tree'

export const getDescendantByParent = (
  nodes: TreeNodeList,
  currentContainer: TreeNode
): TreeNodeList => {
  const foundList: any[] = []
  const search = (currentParent: string | number) => {
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

export const getAllDescendantsForCurrentContainers = (
  nodeList: TreeNodeList,
  containerItems: TreeNodeList
): Array<TreeNodeList> => {
  return containerItems.map(parent => {
    return getDescendantByParent(nodeList, parent)
  })
}

export const getChildrenByParent = (
  nodes: TreeNodeList,
  parentId: number | string | null = null
): TreeNodeList => {
  return nodes.filter(n => n.parentId === parentId)
}
