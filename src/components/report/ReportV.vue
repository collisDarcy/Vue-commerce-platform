<template>
  <div>
    <!-- <p>数据报表组件</p> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/FirstPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 2:为echarts准备一个具备大小宽高的DOM -->
      <div id="main" style="width:750px;height:400px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import _ from 'lodash'
export default {
  data(){
    return{
        // 需要合并的数据
       options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created(){},
  // 此时的页面上的元素已经被渲染完毕
  async mounted(){
    // 基于准备好的DOM,初始化echarts实例
    var myChart=echarts.init(document.getElementById('main'))
    // 准备数据和配置项
    const {data:res}=await this.$http.get('reports/type/1')
    if(res.meta.status!==200){
      return this.$message.error({
        message:'获取折线图数据失败！',
        center:true
      })
    }

      // 指定图表的配置项和数据
   const result=  _.merge(res.data,this.options)
      // 展示数据
      myChart.setOption(result)
  },
  methods:{}

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

</style>