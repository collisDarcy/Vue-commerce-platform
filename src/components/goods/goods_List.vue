<template>
  <div>
    <!-- <p>这是商品列表组件</p> -->
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
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @keydown.enter.native="getGoodsList" @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" width="60px" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- table表格区域 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="75px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="80px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">
            {{ scope.row.add_time | dataFormat }}
            <!-- {{ scope.row.add_time }} -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- {{ scope.row }} -->
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.goods_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryInfo.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="queryInfo.pagesize" layout="sizes, prev, pager, next" :total="total"> </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // document.querySelector('.list').classList.remove('.el-breadcrumb__inner')
    return {
      queryInfo: {
        query: '', // 查询参数
        pagenum: 1, //当前页码
        pagesize: 10, // 每页显示条数
      },
      // 商品列表
      goodsList: [],
      // 总数据条数
      total: 0,
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '获取商品列表失败！',
          center: true,
        })
      }
      this.$message.success({
        message: '获取商品列表成功！',
        center: true,
      })
      console.log(res.data)
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    // 删除商品
    async removeById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      // 删除取消
      if (confirmResult !== 'confirm') {
        return this.$message.info({
          message: '已经取消删除！',
          center: true,
        })
      }
      //删除成功！
      const { data: res } = await this.$http.delete(`goods/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: '删除失败！',
          center: true,
        })
      }
      this.$message.success({
        message: '删除成功！',
        center: true,
      })
      this.getGoodsList()
    },
    // 添加商品
    goAddpage() {
      this.$router.push('/goods/add')
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
/deep/.list {
  color: red;
  font-size: 18px;
  font-family: kaiti;
  font-weight: bolder;
}
</style>
