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
  $truncateLongText?: boolean
}>`
  display: flex;
  flex-direction: column;
  padding-left: ${({ $indent }) => `calc(${$indent || 0} * 1rem)`};
  ${({ $truncateLongText }) =>
    $truncateLongText
      ? `
    overflow-x: hidden;
    min-width: 0;

  `
      : ``}
`

export const UniversalNode = styled(UniversalNodeContainer)<{
  $height?: CSSUnit
  $border?: string
  $borderColor?: string
  $selected?: boolean
  $selectedBgColor?: string
  $hoverColor?: string
}>`
  flex-direction: row;
  align-items: center;
  height: ${({ $height }) => $height || 'initial'};
  border-top: ${({ $border }) => $border || '1px solid'};
  border-top-color: ${({ $borderColor }) => $borderColor || 'transparent'};
  ${({ $selected, $selectedBgColor }) => {
    return $selected ? `background-color: ${$selectedBgColor || 'initial'}` : ''
  }};

  &:hover {
    cursor: pointer;
    ${({ $hoverColor }) => {
      return `background-color: ${$hoverColor || 'initial'};`
    }}
  }
`

export const RowBlock = styled(motion.div)<{
  $truncateLongText?: boolean
}>(({ $truncateLongText }) => [
  `display: flex;`,
  `flex-direction: row;`,
  $truncateLongText ? `overflow-x: hidden; min-width: 0;` : ``
])

export const ColumnBlock = styled(RowBlock)(() => [`flex-direction: column;`])

export const TextBlock = styled(motion.p)<{
  $selected?: boolean
  $selectedColor?: string
  $truncateLongText?: boolean
}>(({ $selected, $selectedColor, $truncateLongText }) => [
  `padding: 0;`,
  `margin: 0;`,
  $selected ? `color: ${$selectedColor || 'initial'};` : ``,
  $truncateLongText
    ? `
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
    : ``
])

export const TextFragment = styled(TextBlock).attrs({ as: 'span' })(() => [])

export const IconBlock = styled(motion.span)<{
  $size?: string
  $color?: string
}>(({ $size, $color }) => [
  `display: flex;`,
  `flex-direction: column;`,
  `align-items: center;`,
  `justify-content: center;`,
  `width: ${$size || '1rem'};`,
  `height: ${$size || '1rem'};`,
  `svg {
    width: 100%;
    height: 100%;
    & * {
      fill: ${$color};
      stroke: ${$color};
    }
  }`
])
