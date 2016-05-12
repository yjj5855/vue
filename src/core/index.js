/**
 * 主入口文件 
 * import Vue from 'vue'
 * 就是引入的这个文件的vue
 */
import Vue from './instance/index'

/**
 * vue项目内部使用的api
 */
import { initGlobalAPI } from './global-api/index'

initGlobalAPI(Vue)  //把这个API给vue

Vue.version = '2.0.0-alpha.0' //vue版本号

export default Vue  //导出Vue
