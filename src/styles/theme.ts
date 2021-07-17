import type { ThemeSettings } from 'react-tree'

const reactTreeBuiltInThemes: ThemeSettings = {
  dark: {
    text: '#fafafa',
    bg: '#2d3439',
    highlight: '#3f464e',
    decal: '#64abd4',
    accent: '#999'
  },
  light: {
    text: '#333',
    bg: '#fafafa',
    highlight: '#f0f0f0',
    decal: '#64abd4',
    accent: '#ccc'
  }
}

const reactTreeAppSettings = {
  sizes: {
    full: '100%',
    half: '50%',
    narrow: '33%'
  }
}

export default {
  ...reactTreeBuiltInThemes,
  _app: {
    ...reactTreeAppSettings
  }
}
