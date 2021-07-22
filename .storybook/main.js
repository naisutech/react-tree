const path = require('path')
const pathToInlineSvg = path.resolve(__dirname, '../src/assets/images')
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    const rules = config.module.rules
    const fileLoaderRule = rules.find((rule) => rule.test.test('.svg'))
    fileLoaderRule.exclude = pathToInlineSvg

    rules.push({
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

    // Return the altered config
    return config
  }
}
