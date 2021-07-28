/**
 * COMPONENTS AND LIBS
 */
import * as React from 'react';
export { InternalTreeProps, NodeId, Leaf, LeafList, Node, NodeList, TreeProps, ToggleFunction, TreeRenderProps, ReactTreeTheme, ThemeSettings } from './Tree';
import { TreeProps, TreeRenderProps } from './Tree';
declare const Tree: React.FC<TreeProps & {
    children?: ({ toggleNodeSelection, toggleSelectAllNodes, toggleOpenCloseNode, toggleOpenCloseAllNodes, selectedNodeIds, openNodeIds }: Partial<TreeRenderProps>) => React.ReactNode;
}>;
export default Tree;
