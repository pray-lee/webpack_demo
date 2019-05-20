// 这两行替代了@babel/polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";
// ------------------------------------------

// 引入lodash 测试code splitting
// lodash util -------------------------------
import _ from 'lodash'
console.log(_)


import('./assets/1.jpg').then( ({default:image}) => {
  // 输出的是 publicPath/文件名.ext, (publicPath的来源是file-loader里options的配置项)
  console.log(image)
  var img = new Image()
  img.src = image
  document.body.appendChild(img)
} )


let button = document.createElement('button')
button.innerHTML = 'add item'
button.onclick = function() {
  let div = document.createElement('div')
  div.classList.add('hot-module-test')
  div.innerHTML = 'item'
  document.body.appendChild(div)
}
document.body.appendChild(button)

// es6 api transform test code
function test () {
  return new Promise(() => {})
}
//css  测试代码抽离和css导入等功能
import './index.scss'
import './style.scss'
import './style.css'

// tree shaking test
import { add } from './math'
add(1,4)