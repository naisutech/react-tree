// import original module declarations
import 'styled-components'

// and extend them!
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
  export interface DefaultTheme {
    [key: string]: ReactTreeTheme
  }
}
