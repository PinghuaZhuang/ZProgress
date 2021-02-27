/**
 * @file 进度条数值
 * @description
 *  1. done 之后不能执行start无效, 必须reset, 这样比较合理.
 */

const VERSION = '1.3.2'

/**
 * 不处于自动步进和自动步进结束的状态
 */
const STATUS_WAIT = 'wait'
/**
 * 自定步进中的状态
 */
const STATUS_STARTED = 'started'
/**
 * 自动步进结束的状态
 */
const STATUS_DONE = 'done'

// 定义是有属性
const _status = Symbol('_status')
const _pause = Symbol('_pause')

interface Settings {
    /**
     * 开始后是否步进
     */
    trickle?: boolean,
    /**
     * 步进频率
     */
    trickleSpeed?: number,
    /**
     * 最小值
     */
    min?: number,
    /**
     * 最大值
     */
    max?: number,
    /**
     * 即将完成的最大值
     */
    // waitMax: .994,
    waitMax?: number,
}

/**
 * 默认配置信息
 */
const settings: Settings = {
    trickle: true,
    trickleSpeed: 200,
    min: 0,
    max: 100,
    // waitMax: .994,
    waitMax: 98,
}

/**
 * 进度条
 */
export default class ZProgress {
    static version = VERSION

    // 配置项
    static props = ['trickle', 'trickleSpeed', 'waitMax']

    /**
     * 进度条进度
     * @type { Number } MIN-MAX 区间内的数字
     */
    $_value: number = settings.min

    /**
     * 初始化参数
     */
    options: Settings

    /**
     * @param { Object } options { stopOnFalse, trickle, trickleSpeed, waitMax }
     * @constructor
     */
    constructor(options: Settings = {}) {

        /**
         * 进度条状态
         * 未开始, 开始, 停止, 结束,
         * @type { String } 枚举, 不接受其他
         */
        this[_status] = STATUS_WAIT

        /**
         * 进度条计算是否暂停
         * @type { Boolean }
         */
        this[_pause] = false

        setPropNoEnumerable(this, 'options', options)

        // 设置options
        ZProgress.props.forEach(k => (this.options[k] = getProp(k, options)))

        // 冻结配置
        if (Object.freeze) {
            Object.freeze(this.options)
        }
    }

    /**
     * 指定滚动条位置位置
     * @param { Number } value 指定数值
     */
    set(value: number) {
        const calcValue = ZProgress.clamp(value)
        if ((this.$_value = calcValue) >= 100) {
            this[_status] = STATUS_DONE
        } else if (this[_status] === STATUS_DONE) {
            // 结束后修改进度值, 状态改为 wait
            this[_status] = STATUS_WAIT
        }
        return this
    }

    /**
     * 进度条计算开始
     * @description 开始的时候并不一定是0.
     */
    start() {
        this[_pause] = false
        // 如果已经完成
        if (this.isDone() || this.isStarted()) {
            // this.reset() // 重新开始
            return this
        }

        const work = () => {
            window.setTimeout(function () {
                if (!this.isStarted()) return
                if (!this[_pause]) this.trickle() // 是否暂停
                work()
            }.bind(this), this.options.trickleSpeed)
        }

        if (this.options.trickle) {
            work.call(this)
            this[_status] = STATUS_STARTED
            this[_pause] = false
        }

        return this
    }

    /**
     * 进度条计算完成
     * @description 结束后需要reset才能start
     */
    done() {
        this.inc(30 + 50 * Math.random()).set(100)
        this[_status] = STATUS_DONE
        this[_pause] = false
        return this
    }

    /**
     * 进度条计算暂停
     */
    pause() {
        this[_pause] = true
        return this
    }

    /**
     * 进度条计算停止
     * @description 需要一个是否stop的标识
     */
    stop() {
        return this.reset()
    }

    /**
     * 重置进度条状态 && 重置队列的执行
     */
    reset() {
        this[_status] = STATUS_WAIT
        this[_pause] = false
        this.set(0)
        return this
    }

    /**
     * 步进
     * @param { Number } amount 步进距离
     */
    inc(amount?: number) {
        const n = this.value
        if (this.value >= 100) return this
        if (!isNumber(amount)) {
            if (n >= 0 && n < 20) { amount = 10 }
            else if (n >= 20 && n < 50) { amount = 4 }
            else if (n >= 50 && n < 80) { amount = 2 }
            else if (n >= 80 && n < 99) { amount = .5 }
            else { amount = 0 }
        }
        return this.set(ZProgress.clamp(n + amount, 0, this.options.waitMax))
    }

    /**
     * 步进别名
     */
    trickle() {
        return this.inc()
    }

    /**
     * 是否开始
     */
    isStarted(): boolean {
        return this[_status] === STATUS_STARTED
    }

    /**
     * 是否暂停
     */
    isPause(): boolean {
        return !!this[_pause]
    }

    /**
     * 是否结束了
     * @description 在停止状态下返回, 不执行.
     * @return { Boolean }
     */
    isDone(): boolean {
        return this[_status] === STATUS_DONE
    }

    /**
     * 获取进度条进度
     */
    get value(): number {
        return this.$_value
    }
    /**
     * 双向绑定设置进度条
     * @param { Number } value 设置进度条位置
     */
    set value(value: number) {
        this.set(value)
    }

    /**
     * 根据目标值返回在最大值最小值区间的值
     * @param { Number } n 目标值
     * @param { Number } min 最小值
     * @param { Number } max 最大值
     * @return { Number }
     */
    static clamp(n: number, min: number = settings.min, max: number = settings.max): number {
        if (n < min) return min
        if (n > max) return max
        return n
    }
}


/**
 * 判断目标对象是否为函数
 * @param { Any } fn 目标对象
 * @return { Boolean }
 */
function isFunction(fn: any): boolean {
    return typeof fn === 'function'
}

/**
 * 判断目标对象是否为数字
 * @param { Any } target 判断的目标对象
 */
function isNumber(target: any): boolean {
    return typeof target === 'number'
}

/**
 * 为实例设置属性
 * @param { String } prop 属性名
 * @param { Object } options 配置
 */
function getProp(prop: string, options: Settings): any {
    return (prop in options) ? options[prop] : settings[prop]
}

/**
 * 为目标对象设置不可遍历属性
 * @param { Object } target 目标对象
 * @param { String } prop 属性名
 * @param { Any } valule 目标对象属性值
 */
function setPropNoEnumerable(target: Object, prop: string, value: any) {
    Object.defineProperty(target, prop, {
        value,
        enumerable: false,
        writable: true,
    })
}
