import Vue from 'vue'
import App from './App.vue'
//加载路由模块
import router from '@/router/router.js'
// 导入组件库--全部的组件库
import ElementUI, { Message } from 'element-ui'
// 导入样式库
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/gobal.css'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入axios
import axios from 'axios'
// 导入插件tree-grid
import TreeTable from 'vue-table-with-tree-grid'
// 设置请求的的根路径
// axios.defaults.baseURL = 'http://127.0.0.1:3007'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在request拦截器中，展示进度条nprogress.start()

// 配置axios
Vue.prototype.$http = axios
// 设置axios请求拦截器
axios.interceptors.request.use((config) => {
  nprogress.start()
  // 为请求头对象，添加Token 验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在response拦截器中，隐藏进度条
axios.interceptors.response.use((config)=>{
  nprogress.done()
  return config
})

// 配置Vue插件--全部的组件，使用的时候不用再导入组件
Vue.use(ElementUI)
// 将弹窗组件挂载到vue的实例对象上面，可以通过this.$message访问
Vue.prototype.$message = Message
Vue.config.productionTip = false
// 将树状图插件全局注册
Vue.component('tree-table', TreeTable)
// 将富文本编辑器注册为全局可用的组件
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式表
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
// 时间格式化的过滤函数
Vue.filter('dataFormat', function (originTime) {
  const dt = new Date(originTime)
  const y = p(dt.getFullYear())
  const m = p(dt.getMonth() + 1)
  const d = p(dt.getDate())
  const hh = p(dt.getHours())
  const mm = p(dt.getMinutes())
  const ss = p(dt.getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
// 创建补零的函数
function p(s) {
  return s < 10 ? '0' + s : s
}
new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
