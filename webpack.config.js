const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      // 打包图片文件
      {
        test: /\.(jpg|png)$/,
        use:{
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            // outputPath 是文件的输出路径, publicPath 是在打包后的文件夹根目录访问时的公共路径, 如果设置了outputPath的话，则publicPath也要对应设置，才能访问到对应的文件,如果不设置，默认就是根目录，publicPath也设置成'/'或者不设置就可以了
            // outputPath: 'assets/',
            // publicPath: './assets/',
            limit: 2048 // 当大于两k的时候，就不会转换base64, 这个单位是字节
          }
        }
      },
      // 打包静态样式文件
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
// file-loader 是解析路径的
// url-loader是把图片转成base64
// 当指定的limit参数小于实际图片大小，默认会使用file-loader处理.
// loader: url-loader   options: {fallback: file-loader (default)}
// 所以一般使用url-loader即可

//css-loader 把通过import或者url()或者import/require()引入的关联的css文件合并成一个css
// style-loader 把合并成的css内容放在<style></style>标签里然后挂载到页面的<head></head>标签中

//loader执行顺序，从右到左，从下到上