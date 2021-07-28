import * as React from 'react';
interface ReactTreeIcon {
    size: string | 'default';
    currentTheme?: string;
    defaultIcon?: boolean;
    children?: React.ReactNode;
}
declare const MotionIcon: import("framer-motion").CustomDomComponent<ReactTreeIcon & React.RefAttributes<HTMLDivElement>>;
export default MotionIcon;
