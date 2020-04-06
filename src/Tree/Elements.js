import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Element = styled(motion.div)`
  padding: 8px 15px 8px 4px;
  min-height: 20px;
  border-bottom: 1px solid ${props => props.theme[props.currentTheme].highlight};
  ${props => props.isOpen ? 
    `
      border-left: 4px solid ${props.theme[props.currentTheme].decal};
      margin-left: -4px;
    ` : ``}
  
  &:hover {
    background: ${props => props.theme[props.currentTheme].highlight};
  }
`

export const Empty = styled(Element)`
  color: ${props => props.theme[props.currentTheme].accent};
`