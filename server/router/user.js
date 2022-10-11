// 导入express包
const express = require('express')
// 创建路由对象
const router = express.Router()
// 用户的路由模块
//导入用户路由处理函数模块
const userHandler = require('../router-hander/user.js')
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要验证规则的对象并解析出来
const { reg_login_rules } = require('../rules/user.js')
// 注册新用户
router.post('/reguser', expressJoi(reg_login_rules), userHandler.regUser)
// 用户登录
router.post('/login', expressJoi(reg_login_rules), userHandler.login)
// 将路由对象共享出去
module.exports = router
