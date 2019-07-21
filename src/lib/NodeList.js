// @flow
import type { Node, NodeList, ContainerItems } from 'react-tree'

export const splitListByParent: Function = (
  nodeList: NodeList,
  parentId: string
): ContainerItems => {
  const current: NodeList = nodeList.filter(i => i.parentId === parentId)
  const other: NodeList = nodeList.filter(i => i.parentId !== parentId)

  return {
    current,
    other
  }
}

// && ![i.id].includes(current.map(c => c.id)

export const toggleIsOpen = (
  item: Node,
  container: NodeList,
  state: boolean[],
  setState: Function
): void => {
  const index: number = container.findIndex(c => c.id === item.id)

  if (index !== -1) {
    const isOpenCopy = state.slice()
    isOpenCopy[index] = !isOpenCopy[index]
    setState(isOpenCopy)
  }
}

export const getSelectedClass = (
  data: any,
  selected: any,
  darkMode: boolean
): string | null => {
  let selectedClass = null
  const dId = data && data.id ? data.id : null
  const sId = selected && selected.id ? selected.id : null
  const darkClass = darkMode ? 'dark' : 'light'

  if (sId && dId) {
    selectedClass = sId === dId ? 'T-' + darkClass + '-highlight' : null
  }

  return selectedClass
}
