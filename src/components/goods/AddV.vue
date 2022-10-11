<template>
  <div>
    <!-- <p>添加商品组件</p> -->
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/FirstPage' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item><a href="/">用户登录</a></el-breadcrumb-item> -->
      <el-breadcrumb-item class="list">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条区域 -->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏区域 -->
      <!-- 给属性一个固定的值需要用单引号包裹，因为是字符 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
        <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeTableLeave" @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <!-- 级联选择器 -->
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader v-model="addForm.goods_cat" :options="cateList" :props="cateProps" expand-trigger="hover" @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的item项 -->
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="call" v-for="(call, i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- action:表示图片要上传到后台的API地址 -->
            <el-upload :action="uploadURL" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :headers="headersObj" :on-success="handleSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <!-- 添加按钮区域 -->
            <el-button type="primary" class="addShop" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片对话框区域 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt="" width="100%" />
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      activeIndex: '0',
      // 添加商品的表单数据对象
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 图片所属的分类数组
        goods_cat: [],
        // 图片的数组
        pics: [],
        // 商品的详情描述
        goods_introduce: '',
        attrs: [],
      },
      addFormRules: {
        goods_name: [{ required: true, message: '请输入商品名称！', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格！', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量！', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品数量！', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
      },
      // 商品分类列表
      cateList: [],
      // 级联选择器的配置对象
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children', // 父子节点的嵌套
      },
      // 动态参数列表数据
      manyTableData: [],
      // 静态属性列表数据
      onlyTableData: [],
      // 上传图片的URL地址
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 图片上传组件的headers请求头对象
      headersObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      //存储图片预览路径
      previewPath: '',
      // 图片的显示与隐藏--默认为false
      previewVisible: false,
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '获取商品分类列表失败！',
          center: true,
        })
      }
      this.$message.success({
        message: '获取商品分类列表成功！',
        center: true,
      })
      this.cateList = res.data
      console.log(res.data)
    },
    // 级联选择器选中项发生变化，会触发这个函数
    handleChange() {
      console.log(this.addForm.goods_cat)
      // 如果选中项不是第三类型，则清空选择器
      if (this.addForm.goods_cat.length !== 3) {
        return (this.addForm.goods_cat = [])
      }
    },
    //判断切换下一个tab时，是否符合规则
    beforeTableLeave(activeName, oldActiveName) {
      // console.log(activeName, oldActiveName)
      if (this.addForm.goods_name === '' || this.addForm.goods_price === '' || this.addForm.goods_weight === '' || this.addForm.goods_number === '') {
        this.$message.error({
          message: '请填写完整的基本信息！',
          center: true,
        })
        return false
      } else if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error({
          message: '请选择商品分类！',
          center: true,
        })
        return false
      }
    },
    async tabClicked() {
      // console.log(this.activeIndex)
      if (this.activeIndex === '1') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: { sel: 'many' },
        })
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: '获取动态参数列表失败！',
            center: true,
          })
        }
        this.$message.success({
          message: '获取动态参数列表成功！',
          center: true,
        })
        console.log(res.data)
        // 将res.data字符串转化为数组--forEach--split(' ')
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
        this.manyTableData = res.data
      } else if (this.activeIndex === '2') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: { sel: 'only' },
        })
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: '获取动态参数列表失败！',
            center: true,
          })
        }
        this.$message.success({
          message: '获取动态参数列表成功！',
          center: true,
        })
        console.log(res.data)
        this.onlyTableData = res.data
      }
    },
    // 处理图片预览效果
    handlePreview(file) {
      console.log(file)
      //将url中的图片地址赋值给this.previewPath
      this.previewPath = file.response.data.url
      this.previewVisible = true
    },
    // 处理移除图片的操作
    handleRemove(file) {
      //1:获取要移除图片的临时路径
      const filePath = file.response.data.tem_path
      //2:找到临时图片在数组中的索引值
      const i = this.addForm.pics.findIndex((x) => x.pic === filePath)
      //3:调用数组的splice方法，把图片信息对象，从pics数组中删除
      this.addForm.pics.splice(i, 1)
      this.$message.success({
        message: '删除图片成功！',
        center: true,
      })
      console.log(this.addForm)
    },
    // 监听图片上传成功的事件
    handleSuccess(response) {
      console.log(response)
      // 拼接得到一个图片的信息对象
      const picInfo = { pic: response.data.tem_path }
      // 将图片信息对象，push到pics数组中
      this.addForm.pics.push(picInfo)
      this.$message.success({
        message: response.meta.msg,
        center: true,
      })
      console.log(this.addForm)
    },
    // 添加商品的信息
    add() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error({
            message: '请填写必要的表单项！',
            center: true,
          })
        }
        // 执行添加的业务逻辑
        // 将this.addForm进行深拷贝 ----closeDeep(obj)
        const form = _.cloneDeep(this.addForm)
        // 将goods_cat数组转化为以逗号隔开的字符串
        form.goods_cat = form.goods_cat.join(',')
        // console.log(form)
        // 处理动态参数
        this.manyTableData.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' '),
          }
          this.addForm.attrs.push(newInfo)
        })
        // 处理静态参数的vals值本来就是字符串，so不用转
        this.onlyTableData.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          }
          this.addForm.attrs.push(newInfo)
        })
        form.attrs = this.addForm.attrs
        console.log(form)
        // 发起请求添加商品
        //商品的名称，必须是唯一的
        const { data: res } = await this.$http.post('goods', form)
        if (res.meta.status !== 201) {
          return this.$message.error({
            message: '添加商品失败！',
            center: true,
          })
        }
        this.$message.success({
          message: '添加商品成功！',
          center: true,
        })
        this.$router.push('/goods')
      })
    },
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
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
  margin-top: 18px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
}
.el-steps {
  margin: 15px 0;
}
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.addShop {
  margin-top: 16px;
}
</style>
