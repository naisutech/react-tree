// @flow

import styled from 'styled-components'

export default styled.div`
  display: inline-block;
  width: 16px;
  text-align: center;
  color: ${props => props.theme[props.currentTheme].decal};
  font-size: 14px;
  padding-right: 2px;
`
