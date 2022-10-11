<template>
  <div>
    <!-- <p>这是主界面</p> -->
    <el-container id="index-Page">
      <!-- 头部区域 -->
      <el-header>
        <!-- 图片 -->
        <div><img src="../assets/images/2-4.jpg" alt="" /> <span>后台管理系统</span></div>

        <!-- 退出按钮 -->
        <el-button type="info" @click="goback">退出登录</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <!-- 当折叠的时候，侧边栏的宽度会变窄 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <!-- 点击按钮使用菜单栏折叠效果 -->
          <button class="toggle" @click="toggleCollapse">Stretch</button>
          <!-- 侧边栏区域---用户管理 -->
          <el-menu background-color="#313743" text-color="#fff" active-text-color="red" :collapse="isCollapse" :collapse-transition="false" :router="true" unique-opened>
            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <!-- 开启路由模式：router=true,启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
              <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveState('/' + subItem.path)" :default-active="activePath">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 内容主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    const token = window.sessionStorage.getItem('token')
    // console.log(token)
    // console.log(token)
    return {
      //是否折叠
      isCollapse: false,
      // 获取token值
      token: token,
      // 左侧菜单数据
      menuList: [],
      // 菜单图标
      iconsObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-help',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-tools',
      },
      // 被激活的链接地址
      activePath: '',
    }
  },
  created() {
    this.getMenuList()
    // 当被创建的时候就开始执行
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    goback() {
      // 清空本地存储的token
      window.sessionStorage.clear()
      // 强制跳转到登录页
      this.$router.push('/login')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    //获取所有的菜单--方法一
    async getMenuList() {
      const { data: res } = await this.$http.get('menus', {
        headers: { Authorization: this.token },
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menuList = res.data
      // console.log(res)
      // 方法二：
      // await axios
      //   .get('http://127.0.0.1:8888/api/private/v1/menus', {
      //     headers: { Authorization: this.token },
      //   })
      // .then((res) => {
      //   console.log(res)
      //   if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      //   this.menuList = res.data
      //   console.log(res)
      // })
    },
    // 定义二级菜单的激活状态
    saveState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
}
</script>

<style lang="less" scoped>
#index-Page {
  height: 1800px;
  border: 1px solid cyan;
  background-color: red;
}
// .el-container {
//   height: 100%;
//   border: 1px solid cyan;
// }
.el-header {
  background-color: #313743;
  border: 1px solid #313743;
  box-shadow: 0 0 10px cyan;
  height: 100px !important;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  // align-items: center;
  color: #000000;
  font-size: 20px;
  font-family: cursive;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      height: 100%;
      border: 1px dotted #438884;
      border-radius: 10px;
      box-shadow: 0 0 30px #438884;
    }
  }
  .el-button--info {
    background-color: gray;
    height: 50%;
    // margin: 0 auto;
    margin-top: 25px;
  }
}
.el-aside {
  // position: fixed;
  background-color: #313743;
  // height: 100%;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle {
  background-color: gray;
  width: 100%;
  font-size: 18px;
  line-height: 18px;
  color: #fff;
  text-align: center;
  // letter-spacing: 0.2em; // 增加或减少字符之间的空白
  cursor: pointer;
}
/deep/.el-icon-user-solid {
  margin-right: 20px;
}
</style>
