const path = require('path')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'library.js',
    library: 'library', // 引入之后的库名称
    libraryTarget: 'this', // 如果是common引入，this就是global, 如果是script标签引入，this 就是window
    path: path.resolve(__dirname, './dist')
  }
}