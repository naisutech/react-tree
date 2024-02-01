import React from 'react'

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

export declare type TreeRenderFn = ({
  node,
  type,
  selected = false,
  open = false,
  Icon,
  context
}: {
  node: TreeNode
  type: 'leaf' | 'node' | 'loader'
  selected: boolean
  open?: boolean
  Icon?: React.ReactNode
  context: TReactTreeContext
}) => React.ReactNode

/**
 * @public
 */
export declare interface ReactTreeTheme {
  text?: {
    fontSize?: SizeUnit | CSSUnit
    fontFamily?: string
    color?: string
    selectedColor?: string
    hoverColor?: string
  }
  nodes?: {
    height?: CSSUnit
    folder?: {
      bgColor?: string
      selectedBgColor?: string
      hoverBgColor?: string
    }
    leaf?: {
      bgColor?: string
      selectedBgColor?: string
      hoverBgColor?: string
    }
    separator?: {
      border?: string
      borderColor?: string
    }
    icons?: {
      size?: CSSUnit
      folderColor?: string
      leafColor?: string
    }
  }
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

/**
 * @public
 */
export declare type SizeUnit = 'xs' | 'sm' | 'std' | 'lg' | 'xl'
