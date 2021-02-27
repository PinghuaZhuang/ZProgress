/*!
 * zprogress 1.0.2 (https://github.com/zphua2016@gmail.com/zprogress)
 * API https://github.com/zphua2016@gmail.com/zprogress/blob/master/doc/api.md
 * Copyright 2017-2021 zphua2016@gmail.com. All Rights Reserved
 * Licensed under MIT (https://github.com/zphua2016@gmail.com/zprogress/blob/master/LICENSE)
 */

'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * @file 进度条数值
 * @description
 *  1. done 之后不能执行start无效, 必须reset, 这样比较合理.
 */
var VERSION = "1.3.2";
/**
 * 不处于自动步进和自动步进结束的状态
 */

var STATUS_WAIT = "wait";
/**
 * 自定步进中的状态
 */

var STATUS_STARTED = "started";
/**
 * 自动步进结束的状态
 */

var STATUS_DONE = "done"; // 定义是有属性

var _status = Symbol("_status");

var _pause = Symbol("_pause");
/**
 * 默认配置信息
 */


var settings = {
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
  onChage: undefined
};
/**
 * 进度条
 */

var ZProgress = /*#__PURE__*/function () {
  // 配置项

  /**
   * 进度条进度
   * @type { Number } MIN-MAX 区间内的数字
   */

  /**
   * @param { Object } options { stopOnFalse, trickle, trickleSpeed, waitMax }
   * @constructor
   */
  function ZProgress() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ZProgress);

    _defineProperty(this, "$_value", settings.min);

    /**
     * 进度条状态
     * 未开始, 开始, 停止, 结束,
     * @type { String } 枚举, 不接受其他
     */
    this[_status] = STATUS_WAIT;
    /**
     * 进度条计算是否暂停
     * @type { Boolean }
     */

    this[_pause] = false;
    setPropNoEnumerable(this, 'options', options); // 设置options

    ZProgress.props.forEach(function (k) {
      return _this.options[k] = getProp(k, options);
    }); // 冻结配置

    if (Object.freeze) {
      Object.freeze(this.options);
    }
  }
  /**
   * 指定滚动条位置位置
   * @param { Number } value 指定数值
   */


  _createClass(ZProgress, [{
    key: "set",
    value: function set(value) {
      var calcValue = ZProgress.clamp(value);

      if ((this.$_value = calcValue) >= 100) {
        this[_status] = STATUS_DONE;
      } else if (this[_status] === STATUS_DONE) {
        // 结束后修改进度值, 状态改为 wait
        this[_status] = STATUS_WAIT;
      } // 触发onChange事件


      this.options.onChange && this.options.onChange(calcValue);
      return this;
    }
    /**
     * 进度条计算开始
     * @description 开始的时候并不一定是0.
     */

  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      this[_pause] = false; // 如果已经完成

      if (this.isDone() || this.isStarted()) {
        // this.reset() // 重新开始
        return this;
      }

      var work = function work() {
        window.setTimeout(function () {
          if (!this.isStarted()) return;
          if (!this[_pause]) this.trickle(); // 是否暂停

          work();
        }.bind(_this2), _this2.options.trickleSpeed);
      };

      if (this.options.trickle) {
        work.call(this);
        this[_status] = STATUS_STARTED;
        this[_pause] = false;
      }

      return this;
    }
    /**
     * 进度条计算完成
     * @description 结束后需要reset才能start
     */

  }, {
    key: "done",
    value: function done() {
      this.inc(30 + 50 * Math.random()).set(100);
      this[_status] = STATUS_DONE;
      this[_pause] = false;
      return this;
    }
    /**
     * 进度条计算暂停
     */

  }, {
    key: "pause",
    value: function pause() {
      this[_pause] = true;
      return this;
    }
    /**
     * 进度条计算停止
     * @description 需要一个是否stop的标识
     */

  }, {
    key: "stop",
    value: function stop() {
      return this.reset();
    }
    /**
     * 重置进度条状态 && 重置队列的执行
     */

  }, {
    key: "reset",
    value: function reset() {
      this[_status] = STATUS_WAIT;
      this[_pause] = false;
      this.set(0);
      return this;
    }
    /**
     * 步进
     * @param { Number } amount 步进距离
     */

  }, {
    key: "inc",
    value: function inc(amount) {
      var n = this.value;
      if (this.value >= 100) return this;

      if (!isNumber(amount)) {
        if (n >= 0 && n < 20) {
          amount = 10;
        } else if (n >= 20 && n < 50) {
          amount = 4;
        } else if (n >= 50 && n < 80) {
          amount = 2;
        } else if (n >= 80 && n < 99) {
          amount = .5;
        } else {
          amount = 0;
        }
      }

      return this.set(ZProgress.clamp(n + amount, 0, this.options.waitMax));
    }
    /**
     * 步进别名
     */

  }, {
    key: "trickle",
    value: function trickle() {
      return this.inc();
    }
    /**
     * 是否开始
     * @return { Boolean }
     */

  }, {
    key: "isStarted",
    value: function isStarted() {
      return this[_status] === STATUS_STARTED;
    }
    /**
     * 是否暂停
     * @return { Boolean }
     */

  }, {
    key: "isPause",
    value: function isPause() {
      return !!this[_pause];
    }
    /**
     * 是否结束了
     * @description 在停止状态下返回, 不执行.
     * @return { Boolean }
     */

  }, {
    key: "isDone",
    value: function isDone() {
      return this[_status] === STATUS_DONE;
    }
    /**
     * 获取进度条进度
     */

  }, {
    key: "value",
    get: function get() {
      return this.$_value;
    }
    /**
     * 双向绑定设置进度条
     * @param { Number } value 设置进度条位置
     */
    ,
    set: function set(value) {
      this.set(value);
    }
    /**
     * 根据目标值返回在最大值最小值区间的值
     * @param { Number } n 目标值
     * @param { Number } min 最小值
     * @param { Number } max 最大值
     * @return { Number }
     */

  }], [{
    key: "clamp",
    value: function clamp(n) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : settings.min;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : settings.max;
      if (n < min) return min;
      if (n > max) return max;
      return n;
    }
  }]);

  return ZProgress;
}();
/**
 * 判断目标对象是否为函数
 * @param { Any } fn 目标对象
 * @return { Boolean }
 */


_defineProperty(ZProgress, "version", VERSION);

_defineProperty(ZProgress, "props", ['trickle', 'trickleSpeed', 'waitMax', 'onChange']);
/**
 * 判断目标对象是否为数字
 * @param { Any } target 判断的目标对象
 */


function isNumber(target) {
  return typeof target === 'number';
}
/**
 * 为实例设置属性
 * @param { String } prop 属性名
 * @param { Object } options 配置
 */


function getProp(prop, options) {
  return prop in options ? options[prop] : settings[prop];
}
/**
 * 为目标对象设置不可遍历属性
 * @param { Object } target 目标对象
 * @param { String } prop 属性名
 * @param { Any } valule 目标对象属性值
 */


function setPropNoEnumerable(target, prop, value) {
  Object.defineProperty(target, prop, {
    value: value,
    enumerable: false,
    writable: true
  });
}

module.exports = ZProgress;
