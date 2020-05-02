const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: 'last 2 versions'
                  }
                }
              ],
              '@babel/preset-typescript',
              '@babel/preset-react'
            ],
            plugins: [
              'react-hot-loader/babel',
              'transform-class-properties'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Starter',
      template: 'src/index.ejs'
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  devServer: {
    stats: 'errors-only',
    overlay: true,
    historyApiFallback: true,
    hot: true,
    // Use host 0.0.0.0 for Docker
    host: process.env.HOST, // Defaults to `localhost`
    port: 2000, // Defaults to 8080
  },
};
