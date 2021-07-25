import { ReactElement, ReactNode } from 'react'

export declare type NodeId = number | string

export declare interface Entry {
  id: NodeId
  parentId: NodeId | null
}

export declare type Leaf = Entry & { label: string }
export declare type LeafList = Leaf[]

export declare type Node = Entry &
  Leaf & {
    items?: LeafList
  }

export declare type NodeList = Node[]

export declare interface TreeProps {
  nodes: NodeList
  size?: string | 'full'
  onSelect?: (id: Array<NodeId>) => void
  onOpenClose?: (id: Array<NodeId>) => void
  isLoading?: boolean
  customTheme?: ThemeSettings
  theme?: string
  grow?: boolean
  showEmptyItems?: boolean
  noIcons?: boolean
  containerStyle?: React.CSSProperties
  NodeRenderer?:
    | (({ data, isOpen, isRoot, selected, level }: { data: Node; isOpen: boolean; isRoot: boolean; selected: boolean; level: number }) => ReactNode)
    | null
  LeafRenderer?: (({ data, selected, level }: { data: Node; selected: boolean; level: number }) => ReactNode) | null
  IconRenderer?: (({ label: string }) => ReactElement) | null
  animations?: boolean
  noDataString?: string
  loadingString?: string
  emptyItemsString?: string | null
}

export declare function ToggleFunction(nodeId: NodeId, multi: boolean): void
export declare function ToggleFunction(nodeId: NodeId): void
export declare function ToggleFunction(): void | boolean
export declare interface TreeRenderProps {
  toggleNodeSelection: typeof ToggleFunction
  toggleSelectAllNodes: typeof ToggleFunction
  toggleOpenCloseNode: typeof ToggleFunction
  toggleOpenCloseAllNodes: typeof ToggleFunction
  openNodeIds: NodeId[]
  selectedNodeIds: NodeId[]
}

export declare type GenericStateToggler = (nodeId: NodeId, multi: boolean) => void

export declare type InternalTreeProps = Partial<TreeProps> & { currentTheme: string }
export declare type ContainerProps = Partial<InternalTreeProps> & {
  parent: NodeId | null
  level?: number
  selectedNodes: Array<NodeId>
  openNodes: Array<NodeId>
  didToggleSelect: GenericStateToggler
  didToggleOpen: GenericStateToggler
}
export declare type ElementProps = Partial<ContainerProps> & {
  isOpen?: boolean
  isRoot?: boolean
  data: Node | Leaf
  selected?: boolean
  borderTop?: boolean
  borderBottom?: boolean
}

export declare interface ContainerItems {
  current: NodeList
  other: NodeList
}

export declare interface ReactTreeTheme {
  text: string
  bg: string
  indicator: string
  separator: string
  icon: string
  selectedBg: string
  selectedText: string
  hoverBg: string
  hoverText: string
  accentBg: string
  accentText: string
  textSize: 'xsmall' | 'small' | 'default' | 'large' | 'xlarge'
}

export declare interface ThemeSettings {
  [key: string]: ReactTreeTheme
}
