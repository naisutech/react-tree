const path = require('path')
const pathToInlineSvg = path.resolve(__dirname, '../src/assets/images')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async (config, { configType }) => {
    // SVG config for storybook
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test.test('.svg')
    )
    fileLoaderRule.exclude = pathToInlineSvg

    config.module.rules.push({
      test: /\.svg$/,
      include: pathToInlineSvg,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true
          }
        }
      ]
    })

    // frame motion ES module workaround for storybook
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    })
    return config
  }
}
