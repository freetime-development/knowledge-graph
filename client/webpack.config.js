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
  output: {
    publicPath: '/'
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
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-transform-runtime',
              'react-hot-loader/babel',
              'transform-class-properties',
              [
                'babel-plugin-transform-imports',
                {
                  '@material-ui/core': {
                    transform: '@material-ui/core/esm/${member}',
                    preventFullImport: true
                  },
                  '@material-ui/icons': {
                    transform: '@material-ui/icons/esm/${member}',
                    preventFullImport: true
                  }
                }
              ]
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
    port: 2000 || process.env.PORT // Defaults to 8080
  }
}
