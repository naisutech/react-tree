declare module 'react-tree' {
  declare type TreeProps = {
    nodes: NodeList
    size: string
    onSelect?: (id: string) => void
    isLoading: boolean
    customTheme: ThemeSettings
    currentTheme: string
    theme: string
    grow: boolean
    showEmptyItems: boolean
    iconSet: Object | null
    noIcons: boolean
    containerStyle?: Object
  }

  declare type Leaf = {
    id: string | number
    parentId: string | number
    label: string
  }

  declare type Node = {
    id: string | number
    parentId: string | number
    label: string
    items: ?Leaf[]
  }

  declare type NodeList = Node[]

  declare type ContainerItems = {
    current: NodeList
    other: NodeList
  }

  declare type ThemeSettings = {
    [string]: {
      text: string
      bg: string
      highlight: string
    }
  }
}
