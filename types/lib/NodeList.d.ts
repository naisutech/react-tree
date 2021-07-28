import type { Node, NodeList } from '../Tree';
export declare const getDescendantByParent: (nodes: NodeList, currentContainer: Node) => NodeList;
export declare const getAllDescendantsForCurrentContainers: (nodeList: NodeList, containerItems: NodeList) => Array<NodeList>;
export declare const getChildrenByParent: (nodes: NodeList, parentId?: number | string | null) => NodeList;
