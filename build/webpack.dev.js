const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const webpack = require('webpack')

const devConfig = {
  mode: 'development',
  // sourceMap, devtool就是用来配置sourceMap的, inline的意思是不生成map文件，把映射关系写在打包好的文件里。cheap的意思是只提示多少行有错误，不提示多少列。module是如果loader里面发生错误，也会提示,如果不写module的话，就只会提示业务代码，不会检测loader里的错误.
  // development推荐:  devtool: 'cheap-module-eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  devServer: { // 开发服务器，只需要在package.json的scripts里面配置命令`webpack-dev-server`就可以了
    open: true, // 打开浏览器
    port: 8081, // 端口
    contentBase: './dist',
    hot: true, // 开启模块热更新, 光配这个不行，还需要引入webpack里面的hot-module-replacement-plugin, 在插件配置中加入
    // hotOnly: true, // hmr不生效的话，html不会刷新 
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // tree shaking options 配置项, 这里配置完成之后，package.json里面也得配一下sideEffects
  // 如果是在production模式下，下面这个配置就不需要了
  optimization: {
    usedExports: true,
  },
}

module.exports = merge(baseConfig, devConfig)


// file-loader 是解析路径的
// url-loader是把图片转成base64
// 当指定的limit参数小于实际图片大小，默认会使用file-loader处理.
// loader: url-loader   options: {fallback: file-loader (default)}
// 所以一般使用url-loader即可

//css-loader 把通过import或者url()或者import/require()引入的关联的css文件合并成一个css
// style-loader 把合并成的css内容放在<style></style>标签里然后挂载到页面的<head></head>标签中

//loader执行顺序，从右到左，从下到上

// tree shaking 只支持ES module 的模块引入。其他形式的引入不支持
