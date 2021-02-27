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

## :open_file_folder: 目录介绍

```
.
├── demo 使用demo
├── dist 编译产出代码
├── doc 项目文档
├── src 源代码目录
├── test 单元测试
├── CHANGELOG.md 变更日志
└── TODO.md 计划功能
```

## :rocket: 使用者指南

通过npm下载安装代码

```bash
$ npm install --save zprogress
```

如果你是node环境

```js
var base = require('zprogress');
```

如果你是webpack等环境

```js
import base from 'zprogress';
```

如果你是requirejs环境

```js
requirejs(['node_modules/zprogress/dist/index.aio.js'], function (base) {
    // xxx
})
```

如果你是浏览器环境

```html
<script src="node_modules/zprogress/dist/index.aio.js"></script>
```

## 方法
### set
### start
### stop
### done
### reset
### inc
### trickle
### isStarted
### isPause
### isDone

## 静态方法
### clamp

## 属性
### value
