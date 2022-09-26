/**
 * @public
 */
export declare type TreeNodeId = number | string

/**
 * @public
 */
export declare interface TreeNode {
  id: TreeNodeId
  parentId: TreeNodeId | null
  label?: string
  items?: TreeNodeList | null
}

/**
 * @public
 */
export declare type TreeNodeList = TreeNode[]

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
  fontSize: 'xsmall' | 'small' | 'default' | 'large' | 'xlarge' | CSSUnit
  fontFamily: string
  nodeHeight: CSSUnit
}

/**
 * @public
 */
export declare interface ThemeSettings {
  [key: string]: ReactTreeTheme
}

type CSSNumber = number
/**
 * @public
 */
export declare type CSSUnit =
  | `${CSSNumber}rem`
  | `${CSSNumber}em`
  | `${CSSNumber}px`
