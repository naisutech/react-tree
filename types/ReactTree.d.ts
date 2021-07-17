declare module 'react-tree' {
  import { ReactNode } from 'react'

  type NodeId = number | string

  interface Entry {
    id: NodeId
    parentId: NodeId | null
  }

  type Leaf = Entry & { label: string }
  type LeafList = Leaf[]

  type Node = Entry &
    Leaf & {
      items?: LeafList
    }

  type NodeList = Node[]

  interface TreeProps {
    nodes: NodeList
    size?: string
    onSelect?: (id: Array<NodeId>) => void
    onOpenClose?: (id: Array<NodeId>) => void
    isLoading?: boolean
    customTheme?: ThemeSettings
    theme?: string
    grow?: boolean
    showEmptyItems?: boolean
    iconSet?: Object | null
    noIcons?: boolean
    containerStyle?: React.CSSProperties
    nodeRenderer?:
      | (({
          data,
          isOpen = false,
          isroot = false,
          selected = false,
          level = 0
        }: {
          data: Node
          isOpen: boolean
          isRoot: boolean
          selected: boolean
          level: number
        }) => ReactNode)
      | null
    leafRenderer?: (({ data, selected = false, level = 0 }: { data: Node; selected: boolean; level: number }) => ReactNode) | null
  }

  function ToggleFunction(nodeId: NodeId): void
  function ToggleFunction(): void | boolean
  interface TreeRenderProps {
    [key: string]: ToggleFuncion
  }

  type GenericStateToggler = (nodeId: NodeId, multi: boolean = false) => void

  type InternalTreeProps = Partial<TreeProps> & { currentTheme: string }
  type ContainerProps = Partial<InternalTreeProps> & {
    parent: NodeId | null
    level?: number
    selectedNodes: Array<NodeId>
    openNodes: Array<NodeId>
    didToggleSelect: GenericStateToggler
    didToggleOpen: GenericStateToggler
  }
  type ElementProps = Partial<ContainerProps> & {
    isOpen?: boolean
    isRoot?: boolean
    data: Node | Leaf
    selected?: boolean
  }

  interface ContainerItems {
    current: NodeList
    other: NodeList
  }

  interface ReactTreeTheme {
    text: string
    bg: string
    highlightBg: string
    highlightText: string
    selectedBg: string
    selectedText: string
    hoverBg: string
    hoverText: string
    accentBg: string
    accentText: string
  }

  interface ThemeSettings {
    [key: string]: ReactTreeTheme
  }
}
