const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  // sourceMap, devtool就是用来配置sourceMap的, inline的意思是不生成map文件，把映射关系写在打包好的文件里。cheap的意思是只提示多少行有错误，不提示多少列。module是如果loader里面发生错误，也会提示,如果不写module的话，就只会提示业务代码，不会检测loader里的错误.
  // development推荐:  devtool: 'cheap-module-eval-source-map',
  // production推荐:   devtool: 'cheap-module-source-map',
  devtool: 'cheap-module-eval-source-map',
  devServer: { // 开发服务器，只需要在package.json的scripts里面配置命令`webpack-dev-server`就可以了
    open: true, // 打开浏览器
    port: 8081, // 端口
    contentBase: './dist',
    hot: true, // 开启模块热更新, 光配这个不行，还需要引入webpack里面的hot-module-replacement-plugin, 在插件配置中加入
    // hotOnly: true, // hmr不生效的话，html不会刷新 
  },
  entry: {
    main: './src/index.js',
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
        test: /\.(jpg|png)$/,
        use:{
          loader: 'url-loader',
          options: {
            name: '[name].[hash].[ext]',
            // outputPath 是文件的输出路径, publicPath 是在打包后的文件夹根目录访问时的公共路径(通过import或者require引入的文件，本质就是加上publicPath路径的文件名), 如果设置了outputPath的话，则publicPath默认会改变为和outputPath一样的路径，进而访问到对应的文件,如果不设置，默认就是根目录, 也可以人为去配置。前提是如果服务端的资源存放位置发生了变化的话，这里在打包的时候就可以手动配置publicPath。
            outputPath: './assets/', // outputPath默认指向打包输出的文件夹所在目录
            // publicPath: '/assets/',
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
              // importLoaders: 2,  // 这个选项的意思是 如果css里有通过@import引入的模块，他有可能不会走postcss-loader和sass-loader,加上这个配置，通过@import引入的css模块就会从下到上执行postcss-laoder和sass-loader
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
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // tree shaking options 配置项, 这里配置完成之后，package.json里面也得配一下sideEffects
  // 如果是在production模式下，下面这个配置就不需要了
  optimization: {
    usedExports: true
  },
  output: {
    publicPath: '/',  // 这块的publicPath是指打包完成之后，html文件里面引用的资源路径会加上这个前缀
    filename: '[name].js',
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