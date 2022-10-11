// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入验证规则对象的路由
const { update_userinfo_rules, update_password_rules, update_avater_rules } = require('../rules/user.js')
// 导入用户基本信息的处理函数模块
const userinfo_handler = require('../router-hander/userinfo.js')
// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserinfo)
// 获取所有用户信息
router.get('/totalUserInfo', userinfo_handler.getTotalUserInfo)
// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userinfo_rules), userinfo_handler.updateUserinfo)
// 重置密码的路由
// 使用update_password_rules规则验证表单的数据
router.post('/updatePwd', expressJoi(update_password_rules), userinfo_handler.updatePassword)
// 更新用户头像的路由
router.post('/update/avater', expressJoi(update_avater_rules), userinfo_handler.updateAvater)
// 向外共享路由对象
module.exports = router
