<template>
  <div id="container">
    <!-- 将图像到这个位置 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less" scoped>
#container {
  // background-color: cyan;
  height: 100%;
}
</style>
