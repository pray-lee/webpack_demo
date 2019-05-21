const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base')
const  merge = require('webpack-merge')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // importLoaders: 2,
              // modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          // style-loader用minicssextractplugin.loader代替
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    // css代码压缩插件的使用
    minimizer: [new OptimizeCssAssetsPlugin({})]
  },
  output: {
    // 生成环境避免缓存的方法。每个文件后面加一个contenthash,如果文件内容发生变话，contenthash也会相应发生变化
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  // css代码抽取
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].chunk.css'
    })
  ]
}

module.exports = merge(baseConfig, prodConfig)

// css抽离和css压缩都在生产环境使用
// MiniCssExtractPlugin    OptimizeCssAssetsPlugin