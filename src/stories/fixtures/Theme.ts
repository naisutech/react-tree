import { ThemeSettings } from '../../Tree'

export const storyCustomTheme: ThemeSettings = {
  exampleCustomTheme: {
    text: {
      fontSize: 'xl',
      fontFamily: `cursive`,
      color: '#fafafa',
      selectedColor: '#fafafa',
      hoverColor: '#fafafa'
    },
    nodes: {
      height: '3.5rem',
      folder: {
        bgColor: 'gold',
        selectedBgColor: 'goldenrod',
        hoverBgColor: 'yellow'
      },
      leaf: {
        bgColor: 'magenta',
        selectedBgColor: 'blueviolet',
        hoverBgColor: 'violet'
      },
      separator: {
        border: '3px solid',
        borderColor: 'transparent'
      },
      icons: {
        size: '1rem',
        folderColor: 'crimson',
        leafColor: 'white'
      }
    }
  }
}
