const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  mode: 'production',
  resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  output: {
    filename: '[name]-[contentHash].js'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: { loader: 'awesome-typescript-loader' }
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Starter',
      template: 'src/index.ejs'
    })
  ]
};
