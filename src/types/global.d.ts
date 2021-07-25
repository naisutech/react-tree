import 'styled-components'

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
    textSize: 'xsmall' | 'small' | 'default' | 'large' | 'xlarge'
  }

  interface IAppSettings {
    containerSizes: {
      [key: string]: string
    }
    fontSizes: {
      [key: string]: string
    }
  }
  export interface DefaultTheme {
    _themes: {
      [key: string]: ReactTreeTheme
    }
    _app: IAppSettings
  }
}
