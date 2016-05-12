import config from '../config' //公共配置项
import * as util from '../util/index' //工具
import { initUse } from './use' //插件方法 Vue.use(VueRouter) 这个方法
import { initMixin } from './mixin' //混合方法 就是在对象上添加属性和方法
import { initExtend } from './extend' //继承方法 Vue.extend({el,data,template}) 这个方法
import { initAssetRegisters } from './assets' //资源方法 Vue.'components','directives','transitions','filters' 定义组件,指令,过度,过滤器的方法
import { set, del } from '../observer/index' //mvvm框架的核心,通过数据变化来渲染视图

export function initGlobalAPI (Vue) {
  Vue.config = config
  Vue.util = util
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = util.nextTick

  //创建全局资源对象options 里面有所有定义的'components','directives','transitions','filters'
  Vue.options = Object.create(null)
  config._assetTypes.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
