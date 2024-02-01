import { IAppSettings } from 'styled-components'
import type { ThemeSettings } from '../Tree'

const reactTreeBuiltInThemes: ThemeSettings = {
  dark: {
    text: {
      fontSize: 'std',
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;`,
      color: '#fafafa',
      selectedColor: '#fafafa',
      hoverColor: '#fafafa'
    },
    nodes: {
      height: '2.5rem',
      folder: {
        bgColor: '#2d3439',
        selectedBgColor: '#3f464e',
        hoverBgColor: '#505a63'
      },
      leaf: {
        bgColor: '#2d3439',
        selectedBgColor: '#3f464e',
        hoverBgColor: '#505a63'
      },
      separator: {
        border: '1px solid',
        borderColor: '#555'
      },
      icons: {
        size: '1rem',
        folderColor: '#64abd4',
        leafColor: '#64abd4'
      }
    }
  },
  light: {
    text: {
      fontSize: 'std',
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;`,
      color: '#000',
      selectedColor: '#333',
      hoverColor: '#555'
    },
    nodes: {
      height: '2.5rem',
      folder: {
        bgColor: '#fff',
        selectedBgColor: '#eee',
        hoverBgColor: '#ccc'
      },
      leaf: {
        bgColor: '#fff',
        selectedBgColor: '#eee',
        hoverBgColor: '#ccc'
      },
      separator: {
        border: '1px solid',
        borderColor: '#eee'
      },
      icons: {
        size: '1rem',
        folderColor: '#64abd4',
        leafColor: '#64abd4'
      }
    }
  }
}

const reactTreeAppSettings: IAppSettings = {
  fontSizes: {
    xs: '0.625rem',
    sm: '0.875rem',
    std: '1rem',
    lg: '1.25rem',
    xl: '2.125rem'
  }
}

export default {
  themes: {
    ...reactTreeBuiltInThemes
  },
  app: {
    ...reactTreeAppSettings
  }
}
