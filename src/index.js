// 这两行替代了@babel/polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";
// ------------------------------------------

import image from './assets/1.jpg'
// 输出的是 publicPath/文件名.ext, (publicPath的来源是file-loader里options的配置项)
// var img = new Image()
// img.src = image
// document.body.appendChild(img)

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
//css 
import './index.scss'
import './style.css'

// tree shaking test
import { add } from './math'
add()