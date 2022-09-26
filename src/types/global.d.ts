import 'styled-components'
import { CSSUnit } from 'Tree'

declare module 'styled-components' {
  interface ReactTreeTheme {
    text: string
    bg: string
    indicator: string
    separator: string
    icon: string
    selectedBg: string
    selectedText: string
    hoverBg: string
    hoverText: string
    accentBg: string
    accentText: string
    fontSize: 'xsmall' | 'small' | 'default' | 'large' | 'xlarge' | CSSUnit
    fontFamily: string
    nodeHeight: CSSUnit
  }

  interface IAppSettings {
    fontSizes: Record<
      'xsmall' | 'small' | 'default' | 'large' | 'xlarge',
      CSSUnit
    >
  }
  export interface DefaultTheme {
    themes: Record<string, ReactTreeTheme>
    app: IAppSettings
  }
}
