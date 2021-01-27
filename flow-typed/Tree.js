// @flow
declare module 'react-tree' {
  declare export type Leaf = {
    id: string | number,
    parentId: string | number,
    label: string
  }

  declare export type Node = {
    id: string | number,
    parentId: string | number,
    label: string,
    items: ?(Leaf[]),
    expanded: boolean,
    expandAll: boolean
  }

  declare export type NodeList = Node[]

  declare export type ContainerItems = {
    current: NodeList,
    other: NodeList
  }

  declare export type ThemeSettings = {
    [string]: {
      text: string,
      bg: string,
      highlight: string
    }
  }
}
