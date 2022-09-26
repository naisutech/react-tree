import * as React from 'react'
import styled, { useTheme } from 'styled-components'
import { motion } from 'framer-motion'
import ReactTreeContext from './Context'
import { AnyNode } from './Nodes'
import { ReactTreeTheme } from 'Tree'

const TreeWrapper = styled(motion.div)<{
  $backgroundColor?: string
  $fontFamily?: string
  $fontSize?: string
}>(({ $backgroundColor, $fontFamily, $fontSize }) => {
  return [
    `& * {
      font-size: ${$fontSize ? $fontSize : 'initial'};
      font-family: ${$fontFamily ? $fontFamily : 'initial'};
    }`,
    `display: flex; flex-direction: column; flex: 1;`,
    `background-color: ${$backgroundColor || 'initial'};`,
    `padding: 1rem;`
  ]
})

const TreeMessage = styled(motion.div)<{ $theme: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: ${({ theme: options, $theme }) =>
    options.themes[$theme as string].fontFamily};
`

const TreeRoot = ({
  loading,
  containerStyles
}: {
  loading: boolean
  containerStyles?: React.CSSProperties
}) => {
  const options = useTheme()
  const { theme } = ReactTreeContext.useReactTreeContext()

  const currentTheme = options.themes[theme] as ReactTreeTheme
  let fontSize = currentTheme.fontSize
  if (currentTheme.fontSize in options.app.fontSizes) {
    fontSize =
      options.app.fontSizes[
        currentTheme.fontSize as
          | 'xsmall'
          | 'small'
          | 'default'
          | 'large'
          | 'xlarge'
      ]
  }

  return (
    <TreeWrapper
      $backgroundColor={currentTheme.bg}
      $fontFamily={currentTheme.fontFamily}
      $fontSize={fontSize}
      data-test-id="react-tree-root"
      style={{ ...containerStyles, display: 'flex', flexDirection: 'column' }}
    >
      {loading && <TreeMessage $theme={theme}>Loading (more)...</TreeMessage>}
      {!loading && <AnyNode />}
    </TreeWrapper>
  )
}

export default TreeRoot
