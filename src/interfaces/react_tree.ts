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
export declare type TreeNodeId = number | string

/**
 * @public
 */
export declare type TreeNodeList = TreeNode[]
