import type { ThemeSettings } from 'react-tree'

const reactTreeBuiltInThemes: ThemeSettings = {
  dark: {
    text: '#fafafa',
    bg: '#2d3439',
    iconFill: '#64abd4',
    iconStroke: '#64abd4',
    highlightBg: '#3f464e',
    highlightText: '#3f464e',
    selectedBg: '#64abd4',
    selectedText: '#64abd4',
    hoverBg: '',
    hoverText: '',
    accentBg: '#999',
    accentText: '#999',
    textSize: 'default'
  },
  light: {
    text: '#333',
    bg: '#fafafa',
    iconFill: '#64abd4',
    iconStroke: '#64abd4',
    highlightBg: '#f0f0f0',
    highlightText: '#f0f0f0',
    selectedBg: '',
    selectedText: '',
    hoverBg: '#64abd4',
    hoverText: '#64abd4',
    accentBg: '#ccc',
    accentText: '#ccc',
    textSize: 'default'
  }
}

const reactTreeAppSettings = {
  containerSizes: {
    full: '100%',
    half: '50%',
    narrow: '33%'
  },
  fontSizes: {
    xlarge: '34px',
    large: '20px',
    default: '17px',
    small: '13px',
    xsmall: '10px'
  }
}

export default {
  ...reactTreeBuiltInThemes,
  _app: {
    ...reactTreeAppSettings
  }
}
