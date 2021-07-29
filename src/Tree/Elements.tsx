import styled from 'styled-components'
import { m } from 'framer-motion'

export const Element = styled(m.div)<{ currentTheme: string; borderTop: boolean; selected: boolean }>`
  padding: 8px 15px 8px 4px;
  min-height: 20px;
  min-width: 0;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${(props) => props.theme._themes[props.currentTheme || 'dark'].hoverBg};
    color: ${(props) => props.theme._themes[props.currentTheme || 'dark'].hoverText};
  }

  ${({ theme, currentTheme, borderTop }) => (borderTop ? `border-top: 1px solid ${theme._themes[currentTheme || 'dark'].separator};` : '')}

  ${(props) =>
    props.selected
      ? `
    background-color: ${props.theme._themes[props.currentTheme || 'dark'].selectedBg};
    color: ${props.theme._themes[props.currentTheme || 'dark'].selectedText};
  `
      : ''}
`

export const Empty = styled(Element)<{ currentTheme: string }>`
  color: ${({ theme, currentTheme }) => theme._themes[currentTheme || 'dark'].accentText};
  background-color: ${({ theme, currentTheme }) => theme._themes[currentTheme || 'dark'].accentBg};
`
