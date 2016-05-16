/**
 * 主入口文件 
 * import Vue from 'vue'
 * 就是引入的这个文件的vue
 */
import Vue from './instance/index'

import { initGlobalAPI } from './global-api/index'

initGlobalAPI(Vue)  //设置全局API给Vue类

Vue.version = '2.0.0-alpha.0' //vue版本号

export default Vue  //导出Vue
