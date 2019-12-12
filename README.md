# webgl-fbx-viewer

一个fbx模型的观察器，包含了模型的各种材质切换展示
       
这个fbx模型观察器设计的很通用 ~希望能运用到你的项目中~

### ...待开发


# Screenshot
<img src="https://raw.githubusercontent.com/dwqdaiwenqi/webgl-fbx-viewer/master/preview1.png"/>


# Install

```js
npm install webgl-fbx-viewer --save
```
## or

```js
cnpm install webgl-fbx-viewer --save
```

# CDN
* [https://unpkg.com/webgl-fbx-viewer@1.0.0/dist/scripts/assetstore-webgl-1.0.0.js](https://unpkg.com/webgl-fbx-viewer@1.0.0/dist/scripts/assetstore-webgl-1.0.0.js.js)


# Usage
### HTML
```html
  <script src="//threejs.org/build/three.js"></script>
  <script src="//threejs.org/examples/js/libs/inflate.min.js"></script>
  <script src="//threejs.org/examples/js/loaders/FBXLoader.js"></script>
  <script src="//threejs.org/examples/js/controls/OrbitControls.js"></script>

  <script src="node_modules/webgl-fbx-viewer@1.0.0/dist/scripts/assetstore-webgl-1.0.0.js"></script>
  
  <div id="example">
    
  </div>
```
### JS
```js

  WebGlAssetStore.init('#example',{
    enableMenu: true,  //启动交互面板
    textureCube: [], // 环境贴图
    animate:true, // 开启动画
    poster:'//static.xyimg.net/cn/static/fed/common/img/posterx.jpg', // 海报
    src:'//192.168.94.204:7878/models/cxy-model/12312.FBX' // 远程模型地址
  }).onError((e)=>{
    // ...
    // 错了 。。。。
    alert(e)
  })
 
```
### Work with module bundler

```js
import WebGlAssetStore from 'webgl-fbx-viewer';

// .......
```

# Api
### Options
```js
{
  
}

```


```


## Methods
| 方法     | 类型     | 描述 | 必需 | 
| :------------- | :------------- | :------------- | :------------- | 


```
### ...待完善

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
