var path = require('path')
module.exports = {
  entry: './src/Tree.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'Tree.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      }
    ]
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
}
