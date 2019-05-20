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
        exclude: /node_modules/,
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
            ],
            plugins: ['@babel/plugin-syntax-dynamic-import'] 
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
  optimization: {
    // 配置代码分割
    splitChunks: {
      chunks: 'all', // 同步模块会走下面的cacheGroups，如果符合要求，才会进行打包
      minSize: 30000, // 大于这个值才会打包
      maxSize: 0, // 一般不用配
      minChunks: 1, // 如果有这个数量以上的chunk使用了一个库, 就会对这个库进行打包
      maxAsyncRequests: 5, // 一般用默认 
      maxInitialRequests: 3, // 一般用默认
      automaticNameDelimiter: '~', // 组和文件之间的连接符
      name: true, // 一般用默认
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 如果需要分割的代码在这个目录下，才会打包
          priority: -10, // 组的优先级
          filename: 'vendor.js' // --------------打包文件的重新命名, 这个名字会覆盖叼output配置项里面的chunkFilename---------------------
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true // 如果之前打包过，就不需要再次打包了。
        }
      }
    } 
  }, 
  output: {
    publicPath: '/',  // 这块的publicPath是指打包完成之后，html文件里面引用的资源路径会加上这个前缀
    filename: '[name].js',
    chunkFilename: '[name].chunk.js', // 非入口文件打包出来的文件名称重命名
    path: path.resolve(__dirname, '../dist')
  },
  // 配置提示信息
  performance: {
    // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
    hints: "warning",
    // 开发环境设置较大防止警告
    // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
    maxEntrypointSize: 5000000, 
    // 最大单个资源体积，默认250000 (bytes)
    maxAssetSize: 3000000
  }
}

// coding splitting 本身和wepback 无关
// webpack 实现代码分割，两种方式
// 1. 同步代码
  // 只需要在webpack.base.js中做optimization的配置就行
// 2. 异步代码 (import().then( () => () )
  // 无需做任何配置，会自动进行代码分割

// 为什么代码分割默认用async呢？
 // 因为使用webpack的话，最好是使用async（异步）的方式进行代码编写，这样才能最好的优化前端性能。避免当前用不到的资源也同时加载。节省了带宽，提高网站打开速度.
