import { initProxy } from './proxy' //目前不知道干嘛用
import { initState, stateMixin } from './state' //和数据相关
import { initRender, renderMixin } from './render' //和渲染相关
import { initEvents, eventsMixin } from './events' //和事件相关
import { initLifecycle, lifecycleMixin, callHook } from './lifecycle' //和生命周期相关
import { mergeOptions } from '../util/index' //合并父级options到子级的工具方法

let uid = 0 //vue内部使用的编号,每创建一个vue实例就+1

/**
 * 导出Vue
 */
export default class Vue {
  /**
   * 构造函数 new Vue() 或者new 组件 的时候执行
   * options = {el,data,template...}
   * 
   */
  constructor (options) {
    this._init(options)
  }

  /**
   * 初始化Vue实例方法
   * @param options
   * @private
   */
  _init (options) {
    // a uid 
    this._uid = uid++ 
    // a flag to avoid this being observed 标记是Vue对象
    this._isVue = true 
    // merge options 合并options
    this.$options = mergeOptions(
      this.constructor.options,
      options || {},
      this
    )
    if (process.env.NODE_ENV !== 'production') {
      initProxy(this)
    } else {
      this._renderProxy = this
    }
    initLifecycle(this) //初始化生命周期
    initEvents(this) //初始化事件
    callHook(this, 'init') //调用init钩子
    initState(this) //初始化数据
    callHook(this, 'created') //调用created钩子
    initRender(this) //执行渲染
  }
}
/**
 * 给Vue.prototype添加数据方法
 * 1.$data 可以用这个属性操作数据
 * 2.$watch 方法
 */
stateMixin(Vue)

/**
 * 给Vue.prototype添加事件方法  当你使用 this.$emit('事件名称',参数) 就是这里添加的方法
 * 1.$on
 * 2.$off
 * 3.$once
 * 4.$emit
 */
eventsMixin(Vue)

/**
 * 给Vue.prototype添加生命周期方法 _开头的是内部方法 $开头的是公开方法 
 * 1.$forceUpdate 使vm强制更新,如你修改了一个值,要让他马上反应到视图上就可以用 this.$forceUpdate() 方法
 * 2.$destroy 销毁当前vm
 */
lifecycleMixin(Vue)

/**
 * 给Vue.prototype添加渲染方法
 * 1.$nextTick 数据改变要显示在视图之后执行的操作,可以使用这个方法
 * 2.$isServer 2.0 新增加的,服务端渲染相关
 */
renderMixin(Vue)
