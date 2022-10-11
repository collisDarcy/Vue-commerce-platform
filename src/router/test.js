import axios from 'axios'

// 调用axios方法得到的返回值是Promise对象
const result = axios({
  method: 'post',
  url: 'http://127.0.0.1:3007/api/reguser',
})
result.then((books) => {
  console.log(books.data)
})
