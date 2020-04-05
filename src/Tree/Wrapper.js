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
`

const Wrapper = (props: Props) => {
  const { level } = props
  return <_Wrapper level={level}>{props.children}</_Wrapper>
}

Wrapper.defaultProps = {
  level: 0
}

export default Wrapper
