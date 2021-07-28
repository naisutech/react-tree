import * as React from 'react';
import type { ContainerProps } from '../Tree';
/**
 * At every level of the tree, we have a container. The container is a recursive wrapper component which can contain
 * - 1 or more NODES
 * - 0 or more LEAVES
 *
 * Always render the children nodes first, and then the leaf node collection after
 */
declare const Container: React.FC<ContainerProps>;
export default Container;
