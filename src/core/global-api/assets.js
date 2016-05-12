import config from '../config'
import { warn, isPlainObject } from '../util/index'

export function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods with the following
   * signature:
   *
   * @param {String} id
   * @param {*} definition
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) { //没有参数 返回这个资源
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) { //如果是定义组件 不要使用内置的或保留HTML元素
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            )
          }
        }
        if (type === 'component' && isPlainObject(definition)) { //如果是定义组件 并 第2个参数是原生对象
          definition.name = id
          definition = Vue.extend(definition) //使用Vue.extend方法 创建一个
        }
        this.options[type + 's'][id] = definition //缓存这个对象
        return definition
      }
    }
  })
}
