import styled from 'styled-components'
import { motion } from 'framer-motion'
import { CSSUnit } from 'Tree'

export const TruncatedNodeText = styled(motion.span)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
`

export const UniversalNodeContainer = styled(motion.div)<{
  $selected?: boolean
  $indent?: number
}>`
  display: flex;
  flex-direction: column;
  padding-left: ${({ $indent }) => `calc(${$indent || 0} * 1rem)`};
`

export const UniversalNode = styled(UniversalNodeContainer)<{
  $height?: CSSUnit
}>`
  flex-direction: row;
  align-items: center;
  height: ${({ $height }) => $height || 'initial'};
`
