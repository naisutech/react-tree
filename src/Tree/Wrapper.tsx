// @flow

import * as React from 'react'
import styled from 'styled-components'
import { m } from 'framer-motion'

const _Wrapper = styled(m.div)<{ level: number }>`
  padding-left: calc(${({ level }) => `25px * ${level}`});
  min-height: 20px;
  display: flex;
  align-items: center;
  min-width: 0;
`

const Wrapper: React.FC<{ level: number }> = ({ level, children }) => {
  return <_Wrapper level={level}>{children}</_Wrapper>
}

Wrapper.defaultProps = {
  level: 0
}

export default Wrapper
