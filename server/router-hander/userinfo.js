//导入数据库操作模块
const db = require('../db.js')
const bcrypt = require('bcryptjs')
// 获取用户基本信息的处理函数
exports.getUserinfo = (req, res) => {
  // res.send('OK')
  // 根据用户的Id查询呢用户的基本信息
  //定义sql语句
  const sql = 'select id,username,password,email,avater from user where id=?'
  // req对象上的user属性，是Token解析成功之后，express-jwt中间件帮我们挂载上去的
  db.query(sql, req.user.id, (err, results) => {
    if (err) {
      return res.send({
        status: 1,
        message: err.message,
      })
    }
    // 如果执行成功，但是查询到的数据条数不等于1
    if (results.length !== 1) {
      return res.send({
        status: 1,
        message: '获取用户信息失败！',
      })
    }
    // 将用户的信息响应给客户端
    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results[0],
    })
  })
}
// 获取所有用户的基本信息的处理函数
exports.getTotalUserInfo = (req, res) => {
  // res.send('OK')
  const sql = 'select * from user'
  db.query(sql, (err, results) => {
    if (err) {
      return res.send({
        status: 1,
        message: err.message,
      })
    }
    // if (results.affectedRows !== 1) {
    //   return res.send({
    //     status: 1,
    //     message: '获取用户信息失败！',
    //   })
    // }
    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results,
    })
  })
}
// 更新用户基本信息的处理函数
exports.updateUserinfo = (req, res) => {
  // res.send('OK')
  //定义sql语句
  const sql = 'update user set ? where id=?'
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) {
      return res.send({
        status: 1,
        message: err.message,
      })
    }
    // 如果执行成功，但是影响的行数不等于1
    if (results.affectedRows !== 1) {
      return res.send({
        status: 1,
        message: '更新用户基本信息失败！',
      })
    }
    res.send({
      status: 0,
      message: '修改用户信息成功！',
    })
  })
}
// 重置用户密码的功能的处理函数
exports.updatePassword = (req, res) => {
  // res.send('OK')
  // 根据ID查询用户数据的sql语句
  const sql = 'select * from user where id=?'
  db.query(sql, req.user.id, (err, results) => {
    if (err) {
      return res.send({
        status: 1,
        message: err.message,
      })
    }
    // 检查这个id的用户是否存在
    if (results.length !== 1) {
      return res.send({
        status: 1,
        message: '用户不存在!',
      })
    }
    // 然后再判断提交的旧密码是否正确
    // 用bcrypt.compareSync('提交的旧密码'，'数据库中的旧密码')
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) {
      return res.send({
        status: 1,
        message: '原密码输入错误！',
      })
    }
    // 定义更新用户密码的sql语句
    const sql = 'update user set password=? where id=?'
    // 对新密码进行bcrypt加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      if (err) {
        return res.send({
          status: 1,
          message: err.message,
        })
      }
      // SQL语句执行成功，但是影响行数不等于1
      if (results.affectedRows !== 1) {
        return res.send({
          status: 1,
          message: '更新密码错误！',
        })
      }
      res.send({
        status: 0,
        message: '更新密码成功！',
      })
    })
  })
}
// 更换用户的头像的处理函数
exports.updateAvater = (req, res) => {
  // res.send('OK')
  //更新用户头像的sql语句
  const sql = 'update user set avater=? where id=?'
  db.query(sql, [req.body.avater, req.user.id], (err, results) => {
    if (err) {
      return res.send({
        status: 1,
        message: err.message,
      })
    }
    // 执行sql语句成功，但是影响的行数不等于1
    if (results.affectedRows !== 1) {
      return res.send({
        status: 1,
        message: '更新头像失败！',
      })
    }
    // 更新头像成功！
    res.send({
      status: 0,
      message: '更新头像成功！',
    })
  })
}
