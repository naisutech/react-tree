import styled from 'styled-components'
import { motion } from 'framer-motion'
import type { ElementProps } from 'react-tree'
import { loadPartialConfig } from '@babel/core'

export const Element = styled(motion.div)<Partial<ElementProps>>`
  padding: 8px 15px 8px 4px;
  min-height: 20px;
  min-width: 0;
  &:hover {
    background: ${(props) => props.theme[props.currentTheme || 'dark'].highlight};
  }

  ${(props) => (props.selected ? `background-color: ${props.theme[props.currentTheme || 'dark'].highlight};` : '')}
`

export const Empty = styled(Element)<Partial<ElementProps>>`
  color: ${({ theme, currentTheme }) => theme[currentTheme || 'dark'].accent};
`
