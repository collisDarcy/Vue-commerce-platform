<template>
  <div>
    <!-- <p>这是goods组件</p> -->
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/FirstPage' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item><a href="/">用户登录</a></el-breadcrumb-item> -->
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
      <el-breadcrumb-item><a href="javascripe:;">商品分类</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <tree-table :data="cateList" :columns="columns" :expand-type="false" :selection-type="false" show-index border class="treeTable">
        <!-- 是否有效 -->
        <template slot="isOk" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 权限等级 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作区域 -->
        <template slot="option" slot-scope="">
          <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 30]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>
    <!-- 添加分类的对话框区域 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="30%" @close="addCateDialogClosed">
      <!-- <span>这是一段信息</span> -->
      <!-- 添加分类对话框 -->
      <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <!-- options:用来指定数据源 -->
          <!-- props:用来指定配置对象 -->
          <el-cascader expand-trigger="hover" v-model="selectedKeys" :options="parentCateList" @change="parentCateChanged" :props="cascaderProps" clearable></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },

      // 商品分类的数据列表，默认为空
      cateList: [],
      // 添加分类的表单数据对象
      addCateForm: {
        //将要添加的分类名称
        cat_name: '',
        // 父级分类的Id
        cat_pid: 0,
        // 分类的等级，默认要添加的是1级分类
        cat_level: 0,
      },
      // 添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [{ required: true, message: '请输入分类的名称', trigger: 'blur' }],
      },
      total: 0,
      // 控制添加分类对话框的显示与隐藏
      addCateDialogVisible: false,
      // 存储获取到的数据
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id', //具体选中的值
        label: 'cat_name', // 名称
        children: 'children', //父子嵌套用的哪个属性
        checkStrictly: true,
      },
      // 选中的父级分类的Id数组
      selectedKeys: [],
      // 为table指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        // 模板列----使用插槽
        {
          label: '是否有效',
          // 表示将当前列定义为模板列
          type: 'template',
          template: 'isOk',
        },
        {
          label: '权限等级',
          // 表示将当前列定义为模板列
          type: 'template',
          template: 'order',
        },
        {
          label: '权限等级',
          // 表示将当前列定义为模板列
          type: 'template',
          template: 'option',
        },
      ],
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类的数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '获取商品分类数据失败！',
          center: true,
        })
      }
      this.$message.success({
        message: '获取商品分类数据成功！',
        center: true,
      })
      // 把数据列表，赋值给cateList
      this.cateList = res.data.result
      this.total = res.data.total
    },
    // 监听pagesize的变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听pagenum的变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    // 添加分类对话框的显示与隐藏
    showCateDialog() {
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    // 获取父级分类的数据列表
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', { parmas: { type: 2 } })
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '获取父级分类数据失败！',
          center: true,
        })
      }
      this.parentCateList = res.data
    },
    // 选择项发生变化触发这个函数
    parentCateChanged() {
      console.log(this.selectedKeys)
      // 如果selectedKeys数组中的length大于0，证明选中的父级分类；
      //反之，说明没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类的Id
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
        return
      } else {
        // 父级分类的Id
        this.addCateForm.cat_pid = 0
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = 0
      }
    },
    addCate() {
      // 点击按钮，添加新的分类
      // console.log(this.addCateForm)
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories', this.addCateForm)
        if (res.meta.status !== 201) {
          return this.$message.error({
            message: '添加分类失败！',
            center: true,
          })
        }
        this.$message.success({
          message: '添加分类成功！',
          center: true,
        })
        this.getCateList()
        this.addCateDialogVisible = false
      })
    },
    // 监听对话框关闭事件--重置表单数据
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    },
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 22px;
  font-size: 17px;
  font-family: cursive;
  a {
    color: red;
  }
}
.el-card {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
}
.treeTable {
  margin-top: 18px;
}
</style>
