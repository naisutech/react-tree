// @flow
import * as React from 'react'
import { m } from 'framer-motion'
import styled from 'styled-components'

interface ReactTreeIcon {
  size: string | 'default'
  currentTheme?: string
  defaultIcon?: boolean
  children?: React.ReactNode
}

interface ISizes {
  [key: string]: string
}

const sizes: ISizes = {
  xlarge: '24px',
  large: '20px',
  default: '16px',
  small: '14px',
  xsmall: '10px'
}

const IconWrapper = styled(m.div)<{ size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => sizes[size]};
  height: ${({ size }) => sizes[size]};
  text-align: center;
  padding: 2px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const ReactTreeIconContainer = styled(IconWrapper)<{ currentTheme: string }>`
  svg {
    height: 100%;
    width: 100%;

    * {
      fill: ${({ theme, currentTheme }) => `${theme._themes[currentTheme || 'dark'].icon}`};
      stroke: ${({ theme, currentTheme }) => `${theme._themes[currentTheme || 'dark'].icon}`};
    }
  }
`

const Icon = React.forwardRef<HTMLDivElement, ReactTreeIcon>(({ size = 'default', currentTheme = 'dark', defaultIcon = false, children }, ref) => {
  return defaultIcon ? (
    <ReactTreeIconContainer ref={ref} currentTheme={currentTheme} size={size}>
      {children}
    </ReactTreeIconContainer>
  ) : (
    <IconWrapper ref={ref} size={size}>
      {children}
    </IconWrapper>
  )
})

const MotionIcon = m(Icon, { forwardMotionProps: true })

export default MotionIcon
