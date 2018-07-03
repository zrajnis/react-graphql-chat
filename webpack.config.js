const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.js')
  ],
  module: {
    rules: [{
      exclude: [/node_modules/],
      test: /\.js$/,
      use: ['babel-loader']
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[name]--[local]--[hash:base64:8]',
            modules: true
          }
        },
        'postcss-loader'
        ]
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[local]--[hash:base64:8]',
            modules: true
          }
        },
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: './src/styles/resources.scss'
          }
        }]
      })
    }]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.tpl.html')
    }),
    new ExtractTextPlugin('[name].css', { allChunks: true })
  ],
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'src')
    ]
  }
}
