var path = require('path')
module.exports = {
  entry: './src/Tree.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'Tree.js',
    libraryTarget: 'umd',
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    publicPath: '../build'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/env', '@babel/flow']
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        include: [path.join(__dirname, '../src')],
        exclude: /(node_modules|bower_components|build)/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        include: [path.join(__dirname, '../src')],
        exclude: /(node_modules|bower_components|build)/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  }
}
