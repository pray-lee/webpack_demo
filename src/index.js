import image from './assets/1.jpg'
// 输出的是 publicPath/文件名.ext, 
console.log(image)
var img = new Image()
img.src = image
document.body.appendChild(img)

//css 
import './index.scss'