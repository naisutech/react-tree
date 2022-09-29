import * as React from 'react'
import { useTheme } from 'styled-components'
import Icons from '../assets/images/Icons'
import { TreeNodeId, TreeRenderFn } from 'Tree'
import ReactTreeContext from './Context'
import {
  // ColumnBlock,
  IconBlock,
  RowBlock,
  TextBlock,
  UniversalNode,
  UniversalNodeContainer
} from './Elements'

// AnyNode is used recursively to render the tree
export const AnyNode = ({
  parentId = null,
  depth = 0,
  RenderNode,
  RenderIcon
}: {
  parentId?: TreeNodeId | null
  depth?: number
  RenderNode?: TreeRenderFn
  RenderIcon?: TreeRenderFn
}) => {
  const themeList = useTheme()
  // import all nodes
  const treeContext = ReactTreeContext.useReactTreeContext()
  const {
    nodes,
    openNodes,
    selectedNodes,
    theme,
    options: appOptions,
    toggleNodeOpenState,
    toggleSelectedNodes
  } = treeContext

  const theseNodes = React.useMemo(() => {
    return nodes.filter(n => n.parentId === parentId)
  }, [nodes])

  const theseNodesOpen = React.useMemo(() => {
    return theseNodes.map(n => openNodes.includes(n.id))
  }, [openNodes])

  const theseNodesSelected = React.useMemo(() => {
    return theseNodes.map(n => selectedNodes.includes(n.id))
  }, [selectedNodes])

  const theseItemsSelected = React.useMemo(() => {
    return theseNodes.map(n => {
      if (!n.items) return [] as boolean[] // no items
      return n.items.map(i => selectedNodes.includes(i.id)) // which ones are selected
    })
  }, [selectedNodes])

  const NodeIcon = React.useMemo(() => {
    if (RenderIcon && typeof RenderIcon === 'function') {
      return RenderIcon
    }
    return Icons.node
  }, [RenderIcon])

  const LeafIcon = React.useMemo(() => {
    if (RenderIcon && typeof RenderIcon === 'function') {
      return RenderIcon
    }
    return Icons.file
  }, [RenderIcon])

  const handleToggleOpenNode = React.useCallback((nodeId: TreeNodeId) => {
    toggleNodeOpenState(nodeId)
  }, [])

  const handleToggleSelectedNode = React.useCallback(
    (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      nodeId: TreeNodeId
    ) => {
      let nodeSet: TreeNodeId[] = []

      // include already selected if modified key pressed
      if (event.ctrlKey || event.metaKey) {
        nodeSet.push(...selectedNodes.filter(n => n !== nodeId))
      }

      // exclude already selected for toggle purposes
      if (!selectedNodes.includes(nodeId)) nodeSet.push(nodeId)

      toggleSelectedNodes(nodeSet)
    },
    [selectedNodes]
  )

  const currentTheme = themeList.themes[theme]

  return (
    <UniversalNodeContainer $truncateLongText={appOptions.truncateLongText}>
      {theseNodes.map((n, i) => {
        const isOpen = theseNodesOpen[i]
        const isSelected = theseNodesSelected[i]

        return (
          <UniversalNodeContainer
            key={n.id}
            $selected={theseNodesSelected[i]}
            $truncateLongText={appOptions.truncateLongText}
            onClick={e => {
              e.stopPropagation()
              handleToggleOpenNode(n.id)
              handleToggleSelectedNode(e, n.id)
            }}
          >
            <UniversalNode
              $indent={depth}
              $height={currentTheme.nodes?.height}
              $border={currentTheme.nodes?.separator?.border}
              $borderColor={
                !depth && i === 0
                  ? undefined
                  : currentTheme.nodes?.separator?.borderColor
              }
              $selected={isSelected}
              $selectedBgColor={currentTheme.nodes?.folder?.selectedBgColor}
              $hoverColor={currentTheme.nodes?.folder?.hoverBgColor}
              $truncateLongText={appOptions.truncateLongText}
            >
              <RowBlock
                $truncateLongText={appOptions.truncateLongText}
                style={{ alignItems: 'center' }}
              >
                {!appOptions.noIcons && (
                  <RowBlock style={{ paddingRight: '.25rem' }}>
                    <IconBlock
                      $color={currentTheme.nodes?.icons?.folderColor}
                      $size={currentTheme.nodes?.icons?.size}
                      animate={
                        appOptions.indicatorAnimations
                          ? { rotate: isOpen ? 90 : 0 }
                          : {}
                      }
                    >
                      <NodeIcon
                        node={n}
                        type="node"
                        open={isOpen}
                        selected={isSelected}
                        context={treeContext}
                      />
                    </IconBlock>
                  </RowBlock>
                )}
                {typeof RenderNode === 'function' ? (
                  RenderNode({
                    node: n,
                    type: 'node',
                    open: isOpen,
                    selected: isSelected,
                    context: treeContext
                  })
                ) : (
                  <RowBlock $truncateLongText={appOptions.truncateLongText}>
                    <TextBlock
                      title={n.label}
                      $selected={isSelected}
                      $selectedColor={currentTheme.text?.selectedColor}
                      $truncateLongText={appOptions.truncateLongText}
                    >
                      {n.label}
                    </TextBlock>
                  </RowBlock>
                )}
              </RowBlock>
            </UniversalNode>
            {theseNodesOpen[i] && (
              <UniversalNodeContainer
                $truncateLongText={appOptions.truncateLongText}
              >
                {[
                  <AnyNode
                    key={n.id + '' + depth}
                    parentId={n.id}
                    depth={depth + 1}
                    RenderNode={RenderNode}
                    RenderIcon={RenderIcon}
                  />,
                  appOptions.showEmptyItems &&
                  (!n.items || n.items?.length === 0) ? (
                    <UniversalNode
                      key={n.id + '_no_items'}
                      $height={currentTheme.nodes?.height}
                      $indent={depth + 1}
                      $truncateLongText={appOptions.truncateLongText}
                      $border={currentTheme.nodes?.separator?.border}
                      $borderColor={
                        !depth && i === 0
                          ? undefined
                          : currentTheme.nodes?.separator?.borderColor
                      }
                      onClick={e => {
                        e.stopPropagation()
                      }}
                    >
                      <RowBlock>
                        <TextBlock
                          title="[No items]"
                          $truncateLongText={appOptions.truncateLongText}
                        >
                          [No items]
                        </TextBlock>
                      </RowBlock>
                    </UniversalNode>
                  ) : null,
                  n.items?.map((item, j) => {
                    const isSelected = theseItemsSelected[i][j]
                    return (
                      <UniversalNode
                        key={item.id}
                        $height={currentTheme.nodes?.height}
                        $indent={depth + 1}
                        $border={currentTheme.nodes?.separator?.border}
                        $borderColor={
                          currentTheme.nodes?.separator?.borderColor
                        }
                        $selected={isSelected}
                        $selectedBgColor={
                          currentTheme.nodes?.leaf?.selectedBgColor
                        }
                        $truncateLongText={appOptions.truncateLongText}
                        onClick={e => {
                          e.stopPropagation()
                          handleToggleSelectedNode(e, item.id)
                        }}
                      >
                        <RowBlock
                          $truncateLongText={appOptions.truncateLongText}
                          style={{ alignItems: 'center' }}
                        >
                          {!appOptions.noIcons && (
                            <IconBlock
                              $color={currentTheme.nodes?.icons?.folderColor}
                              $size={currentTheme.nodes?.icons?.size}
                              style={{ paddingRight: '.25rem' }}
                            >
                              <LeafIcon
                                node={item}
                                type="leaf"
                                selected={isSelected}
                                context={treeContext}
                              />
                            </IconBlock>
                          )}
                          {typeof RenderNode === 'function' ? (
                            RenderNode({
                              node: item,
                              type: 'leaf',
                              selected: isSelected,
                              context: treeContext
                            })
                          ) : (
                            <RowBlock
                              $truncateLongText={appOptions.truncateLongText}
                            >
                              <TextBlock
                                title={item.label}
                                $selected={isSelected}
                                $selectedColor={
                                  currentTheme.text?.selectedColor
                                }
                                $truncateLongText={appOptions.truncateLongText}
                              >
                                {item.label}
                              </TextBlock>
                            </RowBlock>
                          )}
                        </RowBlock>
                      </UniversalNode>
                    )
                  })
                ]}
              </UniversalNodeContainer>
            )}
          </UniversalNodeContainer>
        )
      })}
    </UniversalNodeContainer>
  )
}
