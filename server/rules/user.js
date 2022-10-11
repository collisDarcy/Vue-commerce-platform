// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(3).max(10).required()
const password = joi
  .string()
  .pattern(/^[\S]{3,10}$/)
  .required() //[/S]非空字符3到10位之间
// 定义id,emial的验证规则
const id = joi.number().integer().min(1).required()
const email = joi.string().email().required()
const avater = joi.string().dataUri().required()
// 定义验证注册和登录表单数据的规则对象
exports.reg_login_rules = {
  body: {
    username,
    password,
  },
}
// 定义更新用户的基本信息
exports.update_userinfo_rules = {
  body: {
    id,
    username,
    password,
    email,
  },
}
// 定义重置密码的验证规则对象--新旧密码符号密码的验证规则，并且新旧密码不能一致
exports.update_password_rules = {
  body: {
    oldPwd: password,
    //使用joi.not(joi.ref('oldPwd')).concat(password)规则，验证req.body.newPwd的值
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}
// 定义更换用户头像的规则对象--dataUrl():如下格式的字符串数据
//data:base64格式
exports.update_avater_rules = {
  body: {
    avater,
  },
}
