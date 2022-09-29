import 'styled-components'
import { CSSUnit, SizeUnit } from 'Tree'

declare module 'styled-components' {
  interface ReactTreeTheme {
    text?: {
      fontSize?: SizeUnit | CSSUnit
      fontFamily?: string
      color?: string
      selectedColor?: string
      hoverColor?: string
      accentColor?: string
    }
    nodes?: {
      height?: CSSUnit
      folder?: {
        bgColor?: string
        selectedBgColor?: string
        hoverBgColor?: string
      }
      leaf?: {
        bgColor?: string
        selectedBgColor?: string
        hoverBgColor?: string
      }
      indicator?: {
        bgColor?: string
        size?: CSSUnit
      }
      separator?: {
        border?: string
        borderColor?: string
      }
      icons?: {
        size?: CSSUnit
        folderColor?: string
        leafColor?: string
      }
    }
  }

  interface IAppSettings {
    fontSizes: Record<SizeUnit, CSSUnit>
  }
  export interface DefaultTheme {
    themes: Record<string, ReactTreeTheme>
    app: IAppSettings
  }
}
