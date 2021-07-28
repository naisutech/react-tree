import * as React from 'react';
declare const MotionNodeElement: import("framer-motion").CustomDomComponent<Partial<import("../Tree").ContainerProps> & {
    isOpen?: boolean | undefined;
    isRoot?: boolean | undefined;
    data: import("../Tree").Leaf | import("../Tree").Node;
    selected?: boolean | undefined;
    borderTop?: boolean | undefined;
    borderBottom?: boolean | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export default MotionNodeElement;
