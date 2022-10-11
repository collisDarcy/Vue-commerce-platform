<template>
  <div>
    <!-- <p>这是用户列表组件</p> -->
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">登录页面</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动管理</el-breadcrumb-item> -->
      <el-breadcrumb-item :to="{ path: '/users' }">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 分隔间距 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- input输入框区域 -->
          <el-input placeholder="请输入内容">
            <!-- <el-select slot="prepend" placeholder="请选择">
              <el-option label="添加"></el-option>
              <el-option label="删除"></el-option>
              <el-option label="更新"></el-option>
            </el-select> -->
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" round>添加用户</el-button>
          <el-button type="success" round>删除用户</el-button>
          <el-button type="info" round>更改用户</el-button>
          <el-button type="warning" round>更换头像</el-button>
          <el-button type="danger" round>危险按钮</el-button>
        </el-col>
      </el-row>
      <el-table stripe border :data="this.queryInfo.result">
        <el-table-column type="index" label="索引"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="头像" prop="avater"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const token = window.sessionStorage.getItem('token')
    return {
      queryInfo: {
        token: token,
        result: [],
      },
    }
  },
  created() {
    // this.getUserList()
  },
  methods: {
    //定义获取所有用户信息的接口
    // async getUserList() {
    //   const { data: res } = await this.$http.get('/user/totalUserInfo', { headers: { Authorization: this.queryInfo.token } })
    //   console.log('vue',res);
    //   console.log('222');
    //   this.queryInfo.result = res.data
    //   // console.log(this.queryInfo.res)
    // },
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 17px;
  font-size: 17px;
}
.el-card {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  /deep/.el-col.el-col-7 {
    width: 550px;
    padding-left: 22px !important;
    // background-color: cyan;
  }
  .el-button {
    float: left;
    width: 100px;
    font-size: 14px;
    font-weight: 500;
    font-family: kaiti;
    // background-color: ;
  }
}
.el-table {
  margin-top: 15px;
  font-size: 15px;
  font-family: cursive;
  text-align: center;
  line-height: 15px;
  /deep/ .el-table .el-table__cell {
    text-align: center;
  }
}
</style>
