# [zprogress](https://github.com/zphua2016@gmail.com/zprogress)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/zphua2016@gmail.com/zprogress/blob/master/LICENSE)
[![Build Status](https://api.travis-ci.org/PinghuaZhuang/ZProgress.svg?branch=master)](https://travis-ci.org/zphua2016@gmail.com/zprogress)
[![npm](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/zprogress)


## :pill: 兼容性
单元测试保证支持如下环境：

| IE   | CH   | FF   | SF   | OP   | IOS  | Android   | Node  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- |
| 6+   | 29+ | 55+  | 9+   | 50+  | 9+   | 4+   | 4+ |

**注意：编译代码依赖ES5环境，对于ie6-8需要引入[es5-shim](http://github.com/es-shims/es5-shim/)才可以兼容，可以查看[demo/demo-global.html](./demo/demo-global.html)中的例子**



## :open_file_folder: Example

打开 Example/demo-global.html

![demo](./example/demo.gif)



## :rocket: 使用者指南

通过npm下载安装代码

```bash
$ npm install --save zprogress
```

如果你是node环境

```js
var ZProgress = require('zprogress');
var progress = new ZProgress(/* Settings */)
progress.start()
```

如果你是webpack等环境

```js
import ZProgress from 'zprogress';
const progress = new ZProgress(/* Settings */)
progress.start()
```

如果你是requirejs环境

```js
requirejs(['node_modules/zprogress/dist/index.aio.js'], function (ZProgress) {
    var progress = new ZProgress(/* Settings */)
    progress.start()
})
```

如果你是浏览器环境

```html
<script src="node_modules/zprogress/dist/index.aio.js"></script>
```



## Mehods

|                 | 描述           | 参数           |
| --------------- | -------------- | -------------- |
| set             | 设置值         |                |
| start           | 开始           |                |
| done            | 结束           |                |
| pause           | 暂停           |                |
| stop            | 暂停并重置     |                |
| reset           | 重置           |                |
| inc/trickle     | 步进           | (val?: number) |
| isStarted       | 是否开始       |                |
| isPause         | 是否暂停       |                |
| isDone          | 是否结束了     |                |
| ZProgress.clamp | 返回在区间的值 | (val?: number) |



### Settings

```js
const optons = {
    /**
     * 开始后是否步进
     * @type { Boolean }
     */
    trickle: true,
    /**
     * 步进频率, 延迟值
     * @type { Number }
     */
    trickleSpeed: 200,
    /**
     * 最小值
     * @type { Number }
     */
    min: 0,
    /**
     * 最大值
     * @type { Number }
     */
    max: 100,
    /**
     * 即将完成的最大值
     * @type { Number }
     */
    // waitMax: .994,
    waitMax: 98,
    /**
     * change事件
     * @type { Function<number> }
     */
    onChage: undefined,
}
```

