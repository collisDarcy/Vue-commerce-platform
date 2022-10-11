<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/FirstPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户登录</a></el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <!-- 这里使用插槽--放内容 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="danger" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    // 获取存储到本地的token
    const token = window.sessionStorage.getItem('token')
    return {
      // 权限列表
      rightsList: [],
      token: token,
    }
  },
  created() {
    // 获取所有的权限
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      //获取所有权限的数据
      const { data: res } = await this.$http.get('rights/list', { headers: { Authorization: this.token } })
      if (res.meta.status !== 200) {
        console.log(res)
        return this.$message.error({
          message: '获取权限列表失败！',
          center: true,
        })
      }
      this.$message.success({
        message: '获取权限列表成功！',
        center: true,
      })
      this.rightsList = res.data
      // 打印所有的权限列表
      // console.log(this.rightsList)
    },
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 22px;
  font-size: 17px;
  font-family: cursive;
}
.el-card {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
}
</style>
