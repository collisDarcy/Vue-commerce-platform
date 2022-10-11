// 创建路由模块
// 导入Vue
import Vue from 'vue'
// 导入Vue-route
import VueRouter from 'vue-router'
//  创建Vue插件
Vue.use(VueRouter)
// 导入路由
// import Login from '@/components/LoginV.vue'
const Login = () => import(/* webpackChunkName:"login_home_welcome" */ '@/components/LoginV.vue')
// import Index from '@/components/IndexV.vue'
const Index = () => import(/* webpackChunkName:"login_home_welcome" */ '@/components/IndexV.vue')
//导入登陆后加载的子路由
// import FirstPage from '@/components/FirstPage.vue'
const FirstPage = () => import(/* webpackChunkName:"login_home_welcome" */ '@/components/FirstPage.vue')
// import user from '@/components/user/userV.vue'
const user = () => import(/* webpackChunkName:"users_Rights_Roles" */ '@/components/user/userV.vue')
// 导入权限管理模块
// import Rights from '@/components/power/RightV.vue'
const Rights = () => import(/* webpackChunkName:"users_Rights_Roles" */ '@/components/power/RightV.vue')
// import Roles from '@/components/power/RolesV.vue'
const Roles = () => import(/* webpackChunkName:"users_Rights_Roles" */ '@/components/power/RolesV.vue')
// import Cate from '@/components/goods/CateV.vue'
const Cate = () => import(/* webpackChunkName:"Cate_Roles" */ '@/components/goods/CateV.vue')
// import Params from '@/components/goods/ParamsV.vue'
const Params = () => import(/* webpackChunkName:"Cate_Roles" */ '@/components/goods/ParamsV.vue')
// 导入商品列表模块
// import GoodsList from '@/components/goods/goods_List.vue'
const GoodsList = () => import(/* webpackChunkName:"Goods_list_add" */ '@/components/goods/goods_List.vue')
// import add from '@/components/goods/AddV.vue'
const add = () => import(/* webpackChunkName:"Goods_list_add" */ '@/components/goods/AddV.vue')
// 导入商品订单模块
// import order from '@/components/order/OrderV.vue'
const order = () => import(/* webpackChunkName:"order_report" */ '@/components/order/OrderV.vue')
// 导入数据报表组件
// import report from '@/components/report/ReportV.vue'
const report = () => import(/* webpackChunkName:"order_report" */ '@/components/report/ReportV.vue')
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/login' },
    {
      path: '/index',
      component: Index,
      redirect: '/FirstPage',
      children: [
        { path: '/FirstPage', component: FirstPage },
        {
          path: '/users', component: user
        },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList },
        { path: '/goods/add', component: add },
        { path: '/orders', component: order },
        { path: '/reports', component: report }
      ],
    },
  ],
})
// 为路由对象添加beforeEach导航守卫
router.beforeEach((to, from, next) => {
  //to:要访问的路径
  if (to.path === '/login') {
    return next()
  }
  // 从sessionStorage中获得保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    //没有token,则强制跳转到登录页面
    return next('/login')
  }
  next()
  //next:是否放行next();next('/路径'):强制跳转页面
})

// 向外共享router规则----export
export default router
