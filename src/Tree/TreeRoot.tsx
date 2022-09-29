import * as React from 'react'
import styled, { useTheme } from 'styled-components'
import { motion } from 'framer-motion'
import ReactTreeContext from './Context'
import { AnyNode } from './Nodes'
import { ReactTreeTheme, SizeUnit, TreeRenderFn } from 'Tree'
import { ColumnBlock, TextBlock } from './Elements'

const TreeWrapper = styled(motion.div)<{
  $backgroundColor?: string
  $fontFamily?: string
  $fontSize?: string
  $fontColor?: string
  $truncateLongText?: boolean
}>(
  ({
    $backgroundColor,
    $fontFamily,
    $fontSize,
    $fontColor,
    $truncateLongText
  }) => {
    return [
      `& * {
      font-size: ${$fontSize ? $fontSize : 'initial'};
      font-family: ${$fontFamily ? $fontFamily : 'initial'};
      color: ${$fontColor ? $fontColor : 'initial'};
    }`,
      `display: flex; flex-direction: column; flex: 1;`,
      `background-color: ${$backgroundColor || 'initial'};`,
      `padding: 1rem;`,
      $truncateLongText
        ? `overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap;`
        : ``
    ]
  }
)

const TreeMessage = styled(motion.div)<{ $theme: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: ${({ theme: options, $theme }) =>
    options.themes[$theme as string].text?.fontFamily};
`

const TreeRoot = ({
  loading,
  containerStyles,
  RenderNode,
  RenderIcon
}: {
  loading: boolean
  containerStyles?: React.CSSProperties
  RenderNode?: TreeRenderFn
  RenderIcon?: TreeRenderFn
}) => {
  const options = useTheme()
  const {
    nodes,
    theme,
    options: appOptions
  } = ReactTreeContext.useReactTreeContext()

  const currentTheme = options.themes[theme] as ReactTreeTheme
  if (!currentTheme) throw new Error('Specified theme does not exit')

  let fontSize = currentTheme?.text?.fontSize || 'std'

  if (fontSize in options.app.fontSizes) {
    fontSize = options.app.fontSizes[fontSize as SizeUnit]
  }

  return (
    <TreeWrapper
      $backgroundColor={currentTheme.nodes?.folder?.bgColor}
      $fontFamily={currentTheme?.text?.fontFamily}
      $fontSize={fontSize}
      $fontColor={currentTheme?.text?.color}
      $truncateLongText={appOptions.truncateLongText}
      data-test-id="react-tree-root"
      style={{ ...containerStyles, display: 'flex', flexDirection: 'column' }}
    >
      {!loading && nodes.length === 0 && (
        <ColumnBlock
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <TextBlock>{appOptions.messages.noData}</TextBlock>
        </ColumnBlock>
      )}
      {loading && <TreeMessage $theme={theme}>Loading (more)...</TreeMessage>}
      {!loading && <AnyNode RenderNode={RenderNode} RenderIcon={RenderIcon} />}
    </TreeWrapper>
  )
}

export default TreeRoot
