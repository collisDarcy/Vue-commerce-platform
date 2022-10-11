<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/FirstPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户登录</a></el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
        <!-- 角色权限列表区域 -->
        <el-table :data="roleList" border stripe>
          <!-- 展开列 -->
          <el-table-column type="expand">
            <!-- 这是放一个插槽用于存放数据 -->
            <template slot-scope="scope">
              <el-row :class="['bdBottom', i1 === 0 ? 'bdTop' : '', 'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
                <!-- 渲染一级权限 -->
                <el-col :span="5">
                  <el-tag closable @close="removeRightById(scope.row, item1.id)">
                    {{ item1.authName }}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 渲染二，三级权限 -->
                <el-col :span="19">
                  <!-- 通过for循环嵌套渲染二级权限  -->
                  <el-row :class="[i2 === 0 ? '' : 'bdTop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                    <el-col :span="6">
                      <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{ item2.authName }}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <!-- 三级权限 -->
                    <el-col :span="18">
                      <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable @close="removeRightById(scope.row, item3.id)">
                        {{ item3.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <!-- 索引列 -->
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="角色名称" prop="roleName"></el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
          <el-table-column label="操作" width="285px">
            <!-- 以插槽的形式放在这里 -->
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed">
      <!-- <span>这是一段信息</span> -->
      <!-- 内容区域 -->
      <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="deKeys" ref="treeRef"></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    const token = window.sessionStorage.getItem('token')
    return {
      token: token,
      // 所有角色列表数据
      roleList: [],
      // 获取到的用户权限数据
      rightsList: [],
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children',
      },
      // 默认选中的节点ID值数组
      deKeys: [],
      // 当前即将分配权限的角色Id
      roleId: '',
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取所有角色列表
    async getRolesList() {
      const { data: res } = await this.$http.get('roles', { headers: { Authorization: this.token } })
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '获取角色列表失败！',
          center: true,
        })
      }
      // alert('获取列表成功！')
      this.roleList = res.data
      // console.log(this.roleList)
      // this.getRolesList = res.data
      // console.log(this.getRolesList)
    },
    // 根据id删除对应的权限
    async removeRightById(role, rightId) {
      //弹窗提示是否要删除
      const confimResult = await this.$confirm('此操作将永久删除该权限，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confimResult !== 'confirm') {
        return this.$message.info({
          message: '取消了删除!',
          center: true,
        })
      }
      // alert('确认了删除！')
      // const Str = `roles/${role.id}/rights/${rightId}`
      // const url = 'http://127.0.0.1:8888/api/private/v1' + `roles/${role.id}/rights/${rightId}`
      // const url1 = `http://127.0.0.1:8888/api/private/v1/roles/${role.id}/rights/${rightId}`
      // const { data: res } = await axios.delete(url1, { headers: { Authorization: this.token } })
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '删除权限失败！',
          center: true,
          duration: 3000,
        })
      }
      this.$message.success({
        message: '删除权限成功！',
        center: true,
        duration: 3000,
      })
      // 重新刷新权限列表
      // this.getRolesList()
      role.children = res.data
    },
    // 分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id
      // 获取所有权限的数据----呈树状图显示
      const { data: res } = await this.$http.get('rights/tree', { headers: { Authorization: this.token } })
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '获取用户权限列表失败！',
          center: true,
        })
      }
      this.$message.success({
        message: '获取用户权限列表成功！',
        center: true,
      })
      // 用户权限列表获取成功之后，将获取到的数据存储到data中
      this.rightsList = res.data
      // 递归获取三级节点的Id
      this.getLeafKeys(role, this.deKeys)
      console.log(this.rightsList)
      this.setRightDialogVisible = true
    },
    // 通过递归的形式，获取角色下所有的三级权限的
    // id,并保持到deKeys数组中
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      this.deKeys = []
    },
    // 点击为角色分配权限
    async allotRights() {
      const key = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      // 获取选中和半选中的Id值
      // console.log(key)
      // 将数组转化为以逗号拼接的字符串
      const IdStr = key.join(',')
      // const url = `http://127.0.0.1:8888/api/private/v1/roles/${this.roleId}/rights`
      // const { data: res } = await axios.post(url, { rids: IdStr }, { headers: { Authorization: this.token } })
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: IdStr })
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '分配权限失败！',
          center: true,
        })
      }
      this.$message.success({
        message: '分配权限成功！',
        center: true,
      })
      // 分配权限成功之后，需要重新渲染权限列表并且关闭当前分配权限对话框
      this.getRolesList()
      this.setRightDialogVisible = false
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
.el-tag {
  margin: 10px;
}
// 边框样式
.bdTop {
  border-top: 1px solid #eee;
}
.bdBottom {
  border-bottom: 1px solid #eee;
}
// 垂直居中对齐
.vcenter {
  display: flex;
  align-items: center;
}
</style>
