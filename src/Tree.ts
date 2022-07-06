import { ReactElement, ReactNode } from 'react'

/**
 * @public
 */
export declare type NodeId = number | string

export declare interface Entry {
  id: NodeId
  parentId: NodeId | null
}

/**
 * @public
 */
export declare type Leaf = Entry & { label: string; tooltip?: string }

/**
 * @public
 */
export declare type LeafList = Leaf[]

/**
 * @public
 */
export declare type Node = Entry &
  Leaf & {
    items?: LeafList
    selectable?: boolean
  }

/**
 * @public
 */
export declare type NodeList = Node[]

/**
 * @public
 */
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
  IconRenderer?: (({ data, type }: { data?: Node; type?: 'leaf' | 'node' | 'loader' }) => ReactElement) | null
  animations?: boolean
  noDataString?: string
  loadingString?: string
  emptyItemsString?: string | null
  multiSelect?: boolean
  toggleSelect?: boolean
  unselectOnOutsideClick: boolean
}

declare function ToggleFunction(nodeId: NodeId, multi: boolean): void

declare function ToggleFunction(nodeId: NodeId): void

declare function ToggleFunction(): void | boolean

/**
 * @public
 */
export type ToggleFunction = typeof ToggleFunction

/**
 * @public
 */
export declare interface TreeRenderProps {
  toggleNodeSelection: ToggleFunction
  toggleSelectAllNodes: ToggleFunction
  toggleOpenCloseNode: ToggleFunction
  toggleOpenCloseAllNodes: ToggleFunction
  openNodeIds: NodeId[]
  selectedNodeIds: NodeId[]
}

export declare type GenericStateToggler = (nodeId: NodeId, multi: boolean) => void

export declare type ContainerProps = Partial<TreeProps> & {
  currentTheme: string
  parent: NodeId | null
  level?: number
  selectedNodes: Array<NodeId>
  openNodes: Array<NodeId>
  didToggleSelect: GenericStateToggler
  didToggleOpen: GenericStateToggler
  selectable?: boolean
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

/**
 * @public
 */
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

/**
 * @public
 */
export declare interface ThemeSettings {
  [key: string]: ReactTreeTheme
}
