import styled from 'styled-components'
import { motion } from 'framer-motion'
import type { ElementProps } from 'react-tree'
import { loadPartialConfig } from '@babel/core'

export const Element = styled(motion.div)<Partial<ElementProps>>`
  padding: 8px 15px 8px 4px;
  min-height: 20px;
  min-width: 0;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${(props) => props.theme[props.currentTheme || 'dark'].hoverBg};
    color: ${(props) => props.theme[props.currentTheme || 'dark'].hoverText};
  }

  ${({ theme, currentTheme, borderTop }) => (borderTop ? `border-top: 1px solid ${theme[currentTheme || 'dark'].separator};` : '')}

  ${(props) =>
    props.selected
      ? `
    background-color: ${props.theme[props.currentTheme || 'dark'].selectedBg};
    color: ${props.theme[props.currentTheme || 'dark'].selectedText};
  `
      : ''}
`

export const Empty = styled(Element)<Partial<ElementProps>>`
  color: ${({ theme, currentTheme }) => theme[currentTheme || 'dark'].accentText};
  background-color: ${({ theme, currentTheme }) => theme[currentTheme || 'dark'].accentBg};
`
