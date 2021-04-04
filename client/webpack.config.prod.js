const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const WebpackMonitor = require('webpack-monitor')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs']
  },
  output: {
    filename: '[name]-[contentHash].js',
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
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
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
    }),
    new WebpackMonitor({
      capture: true,
      launch: true
    })
  ]
}
