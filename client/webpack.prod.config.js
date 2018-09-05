require('dotenv-safe').load()

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: [
    '@babel/polyfill',
    path.join(__dirname, 'src/index.js')
  ],
  mode: 'production',
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[local]--[hash:base64:8]',
            minimize: true,
            modules: true
          }
        },
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: './src/styles/resources.scss'
          }
        }
      ]
    }]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      maxSize: 240000
    }
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'SERVER_URL',
      'SUBSCRIPTION_URL'
    ]),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.tpl.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    })
  ],
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'src')
    ]
  }
}
