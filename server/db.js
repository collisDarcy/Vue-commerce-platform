const mysql = require('mysql')
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'vue01',
  // charset: 'utf8'
})
module.exports = db
// 查询usr表中的数据
// const sqlStr='select * from user';
// db.query(sqlStr,(err,results)=>{
//   if(err){
//     return console.log(err.message)
//   }
//   console.log(results);
// })
// 插入数据

// const sqlStr='insert into user(username,password) values(?,?)';
// const user={username:'zs',password:'123456'};
// const sqlStr='insert into user set ?';//?表示占位符值得是user
// db.query(sqlStr,user,(err,results)=>{
//   if(err){
//     return console.log(err.message)
//   }
//   if(results.affectedRows===1){
//     console.log('插入数据成功！');
//   }
// })
