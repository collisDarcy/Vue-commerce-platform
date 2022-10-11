<template>
  <div>
    <div id="login-box">
      <!-- 图像区域 -->
      <div class="login-head">
        <img src="../assets/images/1-3.gif" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form label-width="83px" class="fm" :model="loginForm" status-icon :rules="rules" ref="loginForm" @submit.prevent.native="Login">
        <!-- 用户名 -->
        <el-form-item label="用户名:" prop="username" class="item">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="用户密码:" class="psd" prop="password">
          <el-input type="password" prefix-icon="el-icon-lock" show-password v-model="loginForm.password" autocomplete="off" @keydown.enter.native="Login"></el-input>
        </el-form-item>
        <!-- 确认密码
        <el-form-item label="确认密码:" prop="checkPassword">
          <el-input
            type="passwordword"
            prefix-icon="el-icon-lock"
            show-passwordword
            v-model="loginForm.checkPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <!-- 按钮区域 -->
        <el-form-item class="btn">
          <el-button type="primary" plain class="btn1" @click="Login">登录</el-button>
          <el-button type="primary" plain class="btn2" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="sign">Don't have an account?<button @click="showR" class="signup">Sign up</button></div>
    </div>
    <!-- 背景模块 -->
    <div id="forPop"></div>
    <!-- // 点击显示注册弹窗 -->
    <div v-if="showRegister" class="registerPart">
      <!-- 头部部分 -->
      <div class="head">
        <img src="../assets/images/02.png" />
        <p align="center">Sign up to Vue</p>
        <button @click="shutdown" id="shutdown">关闭</button>
      </div>
      <!-- 表单区域 -->
      <div class="centent">
        <el-form :model="reguserForm" status-icon :rules="reguserRules" ref="reguserForm" @submit.prevent.native="reguser">
          <!-- 用户名 -->
          <div id="name">Username --♥♥♥</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user-solid" v-model="reguserForm.username" class="cen-ipt"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <div id="cen-psd">Password --♥♥♥</div>
          <el-form-item prop="password">
            <el-input type="password" prefix-icon="el-icon-lock" show-password v-model="reguserForm.password" autocomplete="off" class="ipt-psd"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" plain class="regBtn" @click="reguser">Sign up</el-button>
          </el-form-item>
        </el-form>
        <!-- 励志名言 -->
        <div class="word">The only way to become excellent is to be endlessly fascinated by doing the same thing over and over.You have to fall in love with boredom.</div>
        <!-- 底部图片 -->
        <!-- 结尾-start -->
        <div class="banner">
          <div class="left">
            <img src="../assets/images/1-5.gif" />
          </div>
          <div class="right">
            <img src="../assets/images/1-6.gif" />
          </div>
        </div>
        <!-- 结尾-end -->
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'LoginV',
  data() {
    // 获取当前的token值
    const token = window.sessionStorage.getItem('token')
    // 登录用户名不能为空
    const validataUsername = (rule, value, callback) => {
      if (value.trim().length < 1) {
        // callback(new Error('用户名不能为空！-------------'))
        this.$message.error({
          message: '用户名不能为空!',
          center: true,
          duration: 3000,
        })
      } else {
        callback()
      }
    }
    // 登录密码不能为空
    const validatePassword = (rule, value, callback) => {
      if (value.trim().length < 1) {
        // callback(new Error('密码不能为空！'))
        this.$message.error({
          message: '密码不能为空!',
          center: true,
          duration: 1000,
        })
      } else {
        callback()
      }
    }
    // 注册用户名不能为空
    const validataUsername1 = (rule, value, callback) => {
      if (value.trim().length < 1) {
        callback(new Error('The username cannot be empty!'))
        this.$message.error({
          message: 'The usename cannot be empty!',
          center: true,
          duration: 3000,
        })
      } else {
        callback()
      }
    }
    // 注册密码不能为空
    const validataPassword1 = (rule, value, callback) => {
      if (value.trim().length < 1) {
        callback(new Error('The Password cannot be empty!'))
        this.$message.error({
          message: 'The Password cannot be empty!',
          center: true,
          duration: 3000,
        })
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '',
        password: '',
        // checkPassword: "",
      },
      // 注册对象
      reguserForm: {
        username: '',
        password: '',
      },
      token: token,
      // 验证规则对象
      rules: {
        password: [
          { validator: validatePassword, trigger: 'blur', required: true },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' },
        ],
        // checkPassword: [{ validator: validatePassword2, trigger: "blur",required:true}],
        username: [
          { validator: validataUsername, required: true, trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' },
        ],
      },
      // 注册规则对象
      reguserRules: {
        password: [
          { validator: validataPassword1, trigger: 'blur', required: true },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' },
        ],
        // checkPassword: [{ validator: validatePassword2, trigger: "blur",required:true}],
        username: [
          { validator: validataUsername1, required: true, trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' },
        ],
      },
      showRegister: false,
    }
  },
  methods: {
    // 用户登录函数，发送post请求给客户端
    Login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return
        // 解构赋值，返回值为promise,可以使用await和async
        //1:----最好用这种---但是我真的不想删除我想的(虽然它很鸡肋)
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status === 200) {
          this.$message.success({
            message: '登录成功！',
            center: true,
            duration: 3000,
          })
          // console.log(res.token)
          window.sessionStorage.setItem('token', res.data.token)
          console.log(res.data.token)
          this.$router.push('/index')
          this.$refs.loginForm.resetFields()
        }
        // 二
        // const { data: res } = await this.$http.post('/api/login', this.loginForm)
        // if (res.status === 0) {
        //   //  alert('登录成功!')
        //   this.$message.success({
        //     message: '登录成功!',
        //     center: true,
        //     duration: 1000,
        //   })
        // console.log(res)
        // 登录成功之后的token保存到客户端的sessionStorage中
        // 项目中出现了其它API的接口，必须在登录之后才能访问
        // token只在当前网站打开期间生效，token保存到sessionStorage中
        // expiresIn:'10h'
        // window.sessionStorage.setItem('token', res.token)
        // this.$router.push('/index')
        // // 登录成功之后，跳转到别的页面，然后清空数据
        // this.$refs.loginForm.resetFields()
        else {
          // alert(res.message)
          this.$message.error({
            message: res.meta.msg,
            // message: res.message,
            center: true,
          })
          console.log(res)
        }
      })
    },
    // 点击重置按钮，重置登录表单
    resetForm() {
      this.$refs.loginForm.resetFields()
    },
    showR() {
      document.getElementById('forPop').style.display = 'block'
      this.showRegister = true
    },
    shutdown() {
      // 关闭背景模块
      document.getElementById('forPop').style.display = 'none'
      // 关闭注册框
      this.showRegister = false
      // 关闭注册框--清空里面的数据
      this.$refs.reguserForm.resetFields()
    },
    // 注册界面
    reguser() {
      this.$refs.reguserForm.validate(async (valid) => {
        if (!valid) return

        //这是自己写的一种方法--无奈只能弃掉--虽痛心不忍！！！！
        const { data: res } = await this.$http.post('/api/reguser', this.reguserForm)
        console.log(res)
        if (res.status === 0) {
          this.$message.success({
            message: '注册成功！',
            center: true,
            duration: 3000,
          })
          //   console.log(res)
          // 这是第二种---不推荐使用--鸡肋
          // const { data: res } = await axios.post('http://127.0.0.1:8888/api/private/v1/users', this.reguserForm, { headers: { Authorization: this.token } })
          // if (res.meta.status !== 201) {
          //   console.log(res)
          //   return this.$message.error('注册失败！')
          // }
          // alert('注册成功！')
          //注册成功，清空登录框中的数据
          this.$refs.reguserForm.resetFields()
          // 关闭注册弹窗
          document.getElementById('forPop').style.display = 'none'
          this.showRegister = false
        } else {
          console.log(res.message)
          this.$message.error({
            message: res.message,
            duration: 3000,
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
#login-box {
  width: 350px;
  height: 250px;
  background-color: #760102;
  box-shadow: 0 0 10px #feb530;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  // 移动transform
  transform: translate(-50%, -50%);
  .login-head {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid #760102;
    border-radius: 50%;
    // margin-left: 120px;
    // 将盒子居中显示
    left: 50%;
    transform: translate(-50%);
    box-shadow: 0 0 30px #feb530;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      // background-color:#2b3b6b;
    }
  }
  // 表单样式
  .el-form {
    //  width: 60%;
    margin-top: 81px;
    border: 1px solid red;
    border-bottom: none;
    // 透明度
    opacity: 0.91;
    // 放大，缩小陪数
    transform: scale(0.75, 0.75);
    box-sizing: border-box;
    box-shadow: 0 0 20px #feb530;
  }
  /deep/.el-form-item__label {
    font-family: kaiti;
    font-size: 13px;
    color: cyan;
  }
  .btn {
    display: flex;
    justify-content: space-between;
  }
  .btn1 {
    // display: flex;;
    flex: 1;
    // padding-right: 30px;
    // justify-content: flex-end;
    margin-right: 50px;
    font-size: 17px;
    font-family: kaiti;
    color: #760102;
    border-radius: 10px;
    box-shadow: #feb530;
    background-color: #ff9933;
  }
  .btn2 {
    flex: 1;
    margin-right: 50px;
    font-size: 17px;
    font-family: kaiti;
    color: #760102;
    // opacity: 0.7
    border-radius: 10px;
    box-shadow: #feb530;
    background-color: #161b22;
  }
  .sign {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: 0px;
    margin-left: 59px;
    font-family: cursive;
    .signup {
      font-size: 16px;
      border-radius: 10px;
      margin-left: 7px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
// 弹出框中的信息模块
.registerPart {
  position: absolute;
  width: 350px;
  height: 600px;
  top: 50%;
  right: 0;
  opacity: 0.91;
  margin-top: -321px;
  margin-right: 74px;
  background-color: #760102;
  box-shadow: 0 0 10px #feb530;
  border: 1px solid red;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 20px #feb530;
  transform: scale(0.85, 0.85);
  .head {
    width: 150px;
    height: 150px;
    // border: 1px solid blue;
    left: 50%;
    transform: translate(65%);
    img {
      width: 100%;
      height: 100%;
    }
    p {
      font-size: 20px;
      font-weight: 400;
      font-family: cursive;
      color: #fff;
      margin-top: -19px;
    }
    #shutdown {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 18px;
      font-family: kaiti;
      color: #760102;
      margin-right: -100px;
    }
  }
  .centent {
    // position: relative;
    width: 100%;
    height: 300px;
    margin-top: 20px;
    background-color: #161b22;
    #name {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 20px;
      font-weight: 400;
      font-family: cursive;
      color: #fff;
      margin-top: 170px;
    }
    #cen-psd {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 20px;
      font-weight: 400;
      font-family: cursive;
      color: #fff;
      margin-top: 249px;
    }
    .cen-ipt {
      margin-top: 30px;
    }
    .ipt-psd {
      margin-top: 18px;
    }
    .regBtn {
      width: 100%;
      font-size: 20px;
      font-weight: 400;
      font-family: cursive;
      color: #fff;
      text-align: center;
      line-height: 20px;
      background-color: #238636;
    }
    // 文字格言
    .word {
      font-size: 14px;
      font-weight: 400;
      font-family: cursive;
      color: #fff;
    }
    .banner {
      display: flex;
      height: 193px;
      // transform: scale(0.6);
      // margin-top: 5px;
      border: 1px solid red;
      justify-content: space-around;
      .left {
        flex: 1;
        // width: 50%;
        border: 1px solid yellow;
        padding-left: -50px;
        // transform: scale(0.6);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        flex: 1;
        // width: 50%;
        border: 1px solid blue;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
// 背景模块
#forPop {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.4;
  background-color: #888888;
  display: none;
}
</style>
