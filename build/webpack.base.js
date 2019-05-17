const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      // es6转es5
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use:{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'entry',
                corejs: 3,
                targets: {
                  chrome: '67'
                }
              }]
            ] 
          }
        }
      },
      // 打包图片文件
      {
        test: /\.(jpg|png|gif)$/,
        use:{
          loader: 'url-loader',
          options: {
            name: '[name].[hash].[ext]',
            limit: 20480, // 单位是b
            // outputPath 是文件的输出路径, publicPath 是在打包后的文件夹根目录访问时的公共路径(通过import或者require引入的文件，本质就是加上publicPath路径的文件名), 如果设置了outputPath的话，则publicPath默认会改变为和outputPath一样的路径，进而访问到对应的文件,如果不设置，默认就是根目录, 也可以人为去配置。前提是如果服务端的资源存放位置发生了变化的话，这里在打包的时候就可以手动配置publicPath。
            outputPath: './assets/',
            // publicPath: '/assets/',
          }
        }
      },
      // 打包静态样式文件
      {
        test: /\.scss$/,
        use:[
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,// 这个选项的意思是 如果css里有通过@import引入的模块，他有可能不会走postcss-loader和sass-loader,加上这个配置，通过@import引入的css模块就会从下到上执行postcss-laoder和sass-loader
              // modules: true // css 文件模块化
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    publicPath: '/',  // 这块的publicPath是指打包完成之后，html文件里面引用的资源路径会加上这个前缀
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  }
}