<template>
  <div>
    <!-- <p>这是user页面</p> -->
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/FirstPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户登录</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索框，按钮区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- input输入框区域 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="身份" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" @change="userState(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
            </el-tooltip>

            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 5, 10, 15]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile" maxlength="11"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="30%" @close="setRoleDialogClosed">
      <!-- 分配角色对话框的区域 -->
      <el-form :label-position="labelPostion" label-width="50px">
        <el-form-item label="用户名:">
          <el-input v-model="userinfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名:">
          <el-input v-model="userinfo.role_name" disabled></el-input>
        </el-form-item>
        <!-- 下拉菜单区域 -->
        <el-form-item label="分配角色:">
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    const token = window.sessionStorage.getItem('token')
    // 验证邮箱的规则
    // const checkEmail = (rule, value, callback) => {
    //   //验证邮箱的正则表达式
    //   const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    //   if (regEmail.test(value)) {
    //     return callback()
    //   }
    //   callback(
    //     this.$message.error({
    //       message: '请输入合法的邮箱',
    //       center: true,
    //       duration: 3000,
    //     })
    //   )
    // }
    // 验证手机号的规则
    const checkMobile = (rule, value, callback) => {
      const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号码!'))
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2, // 每页显示的条数
      },
      token: token,
      // 保存请求回来的用户列表数据
      userList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      // 分配角色对属性的位置
      labelPostion: 'top',
      // 获取当前所在行的用户信息
      userinfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已经选中角色的Id值
      selectedRoleId: '',
      // 查询到的用户信息对象
      editForm: {
        id: '',
        email: '',
        mobile: '',
      },
      // 修改表单的验证规则对象
      editFormRules: {
        email: [
          { required: true, message: '邮箱不能为空!', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
        mobile: [
          { required: true, message: '手机号不能为空!', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      // 添加用户的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '用户名不能为空!', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度为3到10位字符之间！',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '密码不能为空!', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '密码的长度为3到10位字符之间！',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '邮箱不能为空!', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
        mobile: [
          { required: true, message: '手机号不能为空!', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // async getUserList() {
    //   const { data: res } = await axios.get('http://127.0.0.1:8888/api/private/v1/users', {
    //     params: this.queryInfo,
    //   })
    //   console.log(res)
    // },
    async getUserList() {
      const { data: res } = await this.$http.get('users', { headers: { Authorization: this.token }, params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      //返回状态正常，将请求的数据保存在data中
      this.userList = res.data.users
      this.total = res.data.total
      console.log(res.data.users);
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log('111');
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) { 
      // console.log('222');
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听switch开关的状态改变
    async userState(userinfo) {
      console.log(userinfo)
      console.log(this.token)
      // const url = `http://127.0.0.1:8888/api/private/v1/users/${userinfo.id}/state/${userinfo.mg_state}`
      const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      // console.log(res)
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        // console.log(res)
        return this.$message.error('更新用户状态失败！')
      }
      this.$message.success('更新用户状态成功！')
      // userinfo.mg_state = !userinfo.mg_state
      // console.log(res)
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    //点击确定按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return
        // 发起添加用户的网络请求
        // const { data: res } = await axios.post(
        //   'http://127.0.0.1:8888/api/private/v1/users',
        //   {
        //     headers: { Authorization: this.token },
        //   },
        //   this.addForm
        // )
        const { data: res } = await this.$http.post('users', this.addForm, { headers: { Authorization: this.token } })
        // console.log('0000000000000000000')
        // console.log(res)
        // console.log('0000000000000000000')
        if (res.meta.status !== 201) {
          // this.$message.error({
          //   message: '添加用户失败！',
          //   center: true,
          //   duration: 3000,
          // })
          this.$message.error('添加用户失败！')
        }
        // this.$message.success({
        //   message: '添加用户成功！',
        //   center: true,
        //   duration: 3000,
        // })
        this.$message.error('添加用户成功！')
        // console.log('--------------------------')
        // console.log(res)
        // console.log('---------------------')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表的数据
        this.getUserList()
      })
    },
    // 点击修改用户信息
    async showEditDialog(id) {
      const { data: res } = await this.$http.get('users/' + id, { headers: { Authorization: this.token } })
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '查询用户信息失败！',
          center: true,
          duration: 3000,
        })
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile,
          },
          { headers: { Authorization: this.token } }
        )
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: '更新用户信息失败！',
            center: true,
            duration: 3000,
          })
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getUserList()
        //提示数据列表
        this.$message.success({
          message: '更新用户信息成功!',
          center: true,
          duration: 3000,
        })
      })
    },
    // 根据Id删除对应的用户信息
    async removeUserById(id) {
      const confirmResult = await this.$confirm('此操作将永久的删除该用户，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => {
        return err
      })
      if (confirmResult !== 'confirm') {
        return this.$message.info({
          message: '已取消删除!',
          // center: true,
          type: 'info',
          duration: 3000,
        })
      }
      // 发起删除用户信息的请求
      const { data: res } = await this.$http.delete('users/' + id, { headers: { Authorization: this.token } })
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '删除用户失败！',
          center: true,
        })
      }
      this.$message.success({
        message: '删除用户成功！',
        center: true,
      })
      // 刷新一下表格信息--重新渲染一下用户信息
      this.getUserList()

      // alert('删除成功！')
      // 如果用户确认删除，则返回值为字符串confim
      // 如果用户取消了删除，则返回值为字符串cancel
      // console.log(confirmResult)
    },
    // 分配角色的处理函数
    async setRole(userinfo) {
      this.userinfo = userinfo
      // 在展示对话框之前，获取所有的角色列表
      const { data: res } = await this.$http.get('roles', { headers: { Authorization: this.token } })
      if (res.meta.status !== 200) {
        // console.log(res)
        return this.$message.error({
          message: '获取角色列表失败！',
          center: true,
        })
      }
      // alert('获取角色列表成功！')
      this.$message.success({
        message: '获取角色列表失败！',
        center: true,
      })
      // 将用户的列表保存到数据中
      this.rolesList = res.data
      this.setRoleDialogVisible = true
    },
    // 点击按钮，分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error({
          message: '请选择要分配的角色！',
          center: true,
        })
      }
      //如果已经选择了角色，发起请求
      // const url = `http://127.0.0.1:8888/api/private/v1/users/${this.userinfo.id}/role`
      // const { data: res } = await axios.put(url, { rid: this.selectedRoleId }, { headers: { Authorization: this.token } })
      const { data: res } = await this.$http.put(`users/${this.userinfo.id}/role`, { rid: this.selectedRoleId })
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '更新角色失败！',
          center: true,
        })
      }
      this.$message.success({
        message: '更新角色成功！',
        center: true,
      })
      this.getUserList()
      this.setRoleDialogVisible = false
    },
    // 监听分配角色对话框的关闭事件
    setRoleDialogClosed() {
      this.selectedRoleId = ''
      this.userinfo = {}
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
.el-table {
  margin-top: 15px;
  font-size: 15px;
  font-family: cursive;
  text-align: center;
  line-height: 15px;
}
</style>
