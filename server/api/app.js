// 导入express
const express = require('express')
//创建web服务器
const app = express()
// 解决跨域问题
const cors = require('cors')
// 将cors注册为全局中间件
app.use(cors())
// app.use(cors({
//   // origin:['http://localhost:8080','http://127.0.0.1:3007']
// }));
// const joi = require('joi')
//注册解析表单数据的body-parser
const bodyParser = require('body-parser')
// 配置解析模块
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 一定要在路由之前配置解析Token的中间件
const config = require('../rules/config.js')
const expressJWT = require('express-jwt')
// app.use(expressJWT({ secret: config.jwtSecreKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))
app.use(expressJWT({ secret: config.jwtSecreKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))
// app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))
// 导入用户路由模块
const userRouter = require('../router/user.js')
app.use('/api', userRouter)
// 导入获取用户基本信息的路由模块
const userinfoRouter = require('../router/userinfo.js')
app.use('/user', userinfoRouter)
// 定义全局的错误中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  // if (err instanceof joi.ValidationError) {
  //   return res.send({
  //     status: 1,
  //     message: err.message,
  //   })
  // }
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 1,
      message: '身份认证失败！',
    })
  }
  // 其它的错误
  res.send({
    status: 1,
    message: err.message,
  })
  next()
})

//调用app.listen函数
app.listen(3007, () => {
  console.log('Express server running at http://127.0.0.1:3007')
})
