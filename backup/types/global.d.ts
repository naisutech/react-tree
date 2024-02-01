import 'styled-components'
import { CSSUnit, SizeUnit } from 'Tree'

declare module 'styled-components' {
  interface ReactTreeTheme {
    text?: {
      fontSize?: SizeUnit | CSSUnit
      fontFamily?: string
      color?: string
      selectedColor?: string | null
      hoverColor?: string | null
    }
    nodes?: {
      height?: CSSUnit
      folder?: {
        bgColor?: string
        selectedBgColor?: string
        hoverBgColor?: string | null
      }
      leaf?: {
        bgColor?: string
        selectedBgColor?: string
        hoverBgColor?: string | null
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
