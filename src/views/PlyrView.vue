<template>
  <div class="plyr-view-container">
    <h1>Plyr 视频播放器示例</h1>
    <PlyrDemo />
  </div>
</template>

<script setup>
// 引入Plyr演示组件
import PlyrDemo from '../components/PlyrDemo.vue';
</script>

<style scoped>
.plyr-view-container {
  padding: 24px;
}

h1 {
  text-align: center;
  margin-bottom: 32px;
  color: #333;
}
</style>