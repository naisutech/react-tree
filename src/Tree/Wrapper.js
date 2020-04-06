// @flow

import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

type Props = {
  level: number,
  children?: React.Node
}

const _Wrapper = styled(motion.div)`
  padding-left: calc(${props => `20px * ${props.level}`});
  min-height: 20px;
  display: flex;
  align-items: center;
  min-width: 0;
`

const Wrapper = (props: Props) => {
  const { level, children } = props
  return <_Wrapper level={level}>{children}</_Wrapper>
}

Wrapper.defaultProps = {
  level: 0
}

export default Wrapper
