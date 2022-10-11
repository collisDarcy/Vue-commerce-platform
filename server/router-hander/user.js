// 用户路由模块的处理函数
// 注册用户的处理函数
// 导入数据库模块
const db = require('../db.js')
// 导入对密码加密的包--bcryptjs
const bcrypt = require('bcryptjs')
// 导入生成Token字符串的包
// const jwt = require('jsonwebtoken')
// 导入Token的密钥
// const config = require('../rules/config.js')
exports.regUser = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userinfo = req.body
  // 打印客户端提交到服务器的数据
  console.log(userinfo)
  // res.send('注册成功！')
  // 判断用户名和密码是否为空
  if (!userinfo.username || !userinfo.password) {
    return res.send({
      status: 1,
      message: '用户名或密码不合法！',
    })
  }
  // 判断用户名是否被占用
  const sqlStr = 'select * from user where username=?'
  db.query(sqlStr, userinfo.username, (err, results) => {
    // 执行sql语句失败
    if (err) {
      return res.send({
        status: 1,
        message: err.message,
      })
    }
    // 用户名被占用
    if (results.length > 0) {
      return res.send({
        stasus: 1,
        message: '当前用户名被占用，请更换用户名！',
      })
    }
    // 用户名可以使用--将加密过的密码传递给userinfo.password
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // console.log(userinfo);
    // 将加密之后的密码存储到数据库中的user表内
    const sql = 'insert into user set ?'
    // 调用db.query()执行sql语句，插入新用户
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      if (err) {
        return res.send({
          status: 1,
          message: err.message,
        })
      }
      if (results.affectedRows !== 1) {
        return res.send({
          status: 1,
          message: '注册用户失败',
        })
      }
      // 注册成功
      res.send({
        status: 0,
        message: '用户注册成功!',
        password: userinfo.password,
      })
    })
  })
}
// 登录的处理函数
exports.login = (req, res) => {
  // res.send('登录成功！');
  // 获取客户端提交到服务器中的用户信息
  const userinfo = req.body
  //定义sql语句查询用户名是否存在
  const sql = 'select * from user where username=?'
  db.query(sql, userinfo.username, (err, results) => {
    if (err) {
      return res.send({
        status: 1,
        message: err.message,
      })
    }
    if (results.length !== 1) {
      return res.send({
        status: 1,
        message: '用户名不存在',
      })
    }
    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) {
      return res.send({
        status: 1,
        message: '密码错误，请重新输入！',
      })
    }
    // 在服务器端生成Token字符串
    // 否则登录成功！
    // res.send('登录成功！');
    // const user = { ...results[0], password: '' }
    //生成Token字符串
    // const tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2NDc3NDA2NTQsImV4cCI6MTY0NzgyNzA1NH0.oBLQPvvT3Uyd-S5ChyNM49IA3llT_t8OUBTNzRPNTUk'
    // const tokenStr = jwt.sign(user, config.jwtSecreKey, {
    //   expiresIn: '10h', //token有效期为10小时
    // })

    const tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2NDc5NTAwMzMsImV4cCI6MTY0ODAzNjQzM30.KzGn-H42WTScA3gjCreaXNofcn4Zzcd0-OdkSuHYP_c'
    // 调用res.send()将Token响应给客户端
    res.send({
      status: 0,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr,
    })
  })
}
