// @flow
declare module 'react-tree' {
  declare export type Leaf = {
    id: string,
    parentId: string,
    label: string
  }

  declare export type Node = {
    id: string,
    parentId: string,
    label: string,
    items: ?(Leaf[])
  }

  declare export type NodeList = Node[]

  declare export type ContainerItems = {
    current: NodeList,
    other: NodeList
  }
}
