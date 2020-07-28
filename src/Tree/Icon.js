// @flow
import * as React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import AppIcons from '../assets/images/icons'

const sizes = {
  xlarge: '24px',
  large: '20px',
  default: '16px',
  small: '14px',
  xsmall: '10px'
}

const IconContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => sizes[props.size]};
  height: ${props => sizes[props.size]};
  text-align: center;
  padding: 2px;
  overflow: hidden;

  svg {
    height: 100%;
    width: 100%;
    fill: ${props => props.theme[props.currentTheme].decal};
    stroke: ${props => props.theme[props.currentTheme].decal};
  }
`

const _IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

type IconProps = {
  icon: string | null,
  currentTheme: string,
  spin?: boolean,
  size: string
}

const Icon = (props: IconProps) => {
  const { icon, spin, size, ...rest } = props

  const setHTML = val => {
    return {
      __html: val
    }
  }

  const Render = icon ? (
    React.isValidElement(icon) ? (
      <IconContainer size={size} {...rest}>
        {icon}
      </IconContainer>
    ) : (
      <IconContainer
        animate={{ rotate: spin ? 360 : 0 }}
        transition={{ duration: 1, ease: 'linear', loop: Infinity }}
        size={size}
        {...rest}
        dangerouslySetInnerHTML={setHTML(icon ? AppIcons[icon] : null)}
      ></IconContainer>
    )
  ) : null

  return Render
}

Icon.defaultProps = {
  icon: null,
  sping: false,
  size: 'default'
}
export default Icon
