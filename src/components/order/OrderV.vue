<template>
  <div>
    <!-- <p>这是订单组件</p> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/FirstPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索框区域 -->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" width="60px"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="orderList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showBox">修改</el-button>
            <el-button type="success" size="mini" icon="el-icon-location" @click="showProgressBox">物流</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[10, 15, 20, 25]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>
    <!-- 修改地址的对话框 -->
    <el-dialog title="修改地址" :visible.sync="addressDialogVisible" width="50%" @close="addressDialogClosed">
      <!-- <span>这是一段信息</span> -->
      <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <!-- <el-input v-model="addressForm.address1"></el-input> -->
          <el-cascader :options="cityData" v-model="addressForm.address1"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 物流进度的对话框 -->

    <el-dialog title="物流进度" :visible.sync="ProgressDialogVisible" width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
import cityData from './citydata.js'
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页号
        pagesize: 10, //当前页数
      },
      total: 0,
      orderList: [],
      // 修改地址对话框的显示与隐藏
      addressDialogVisible: false,
      // 物流进度的对话框显示与隐藏
      ProgressDialogVisible: false,
      addressForm: {
        address1: [],
        address2: '',
      },
      addressFormRules: {
        address1: [{ required: true, message: '请填写省市区/县!', trigger: 'blur' }],
        address2: [{ required: true, message: '请填写详细地址!', trigger: 'blur' }],
      },
      cityData: cityData,
      progressInfo: [],
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '获取订单列表失败！',
          center: true,
        })
      }
      this.$message.success({
        message: '获取订单列表成功！',
        center: true,
      })
      this.total = res.data.total
      this.orderList = res.data.goods
      console.log(res)
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagesize = newPage
      this.getOrderList()
    },
    // 修改地址
   showBox() {
      this.addressDialogVisible = true
    },
    //监听对话框的关闭事件--清空数据
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields()
    },
    // 物流进度的对话框
    async showProgressBox() {
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '获取物流进度失败！',
          center: true,
        })
      }
      this.$message.success({
        message: '获取物流进度成功！',
        center: true,
      })
      this.progressInfo = res.data
      this.ProgressDialogVisible = true
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
.el-table {
  margin-top: 18px;
}
.el-cascader {
  width: 100%;
}
</style>
