<script setup>
</script>

<template>
  <div class="home-container">
    <h1>Vue 3 学习Demo</h1>
    <p>这个Demo展示了Vue 3的主要特性，包括：</p>
    <ul class="features-list">
      <li>组件化开发</li>
      <li>组合式API</li>
      <li>响应式数据</li>
      <li>Pinia状态管理</li>
      <li>视频播放器</li>
    </ul>
    <div class="demo-links">
      <router-link to="/components">组件演示</router-link>
      <router-link to="/composition-api">组合式API</router-link>
      <router-link to="/reactive">响应式数据</router-link>
      <router-link to="/pinia">状态管理</router-link>
      <router-link to="/plyr">Plyr播放器</router-link>
      <router-link to="/xgplayer">西瓜播放器</router-link>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.features-list {
  list-style-type: none;
  padding: 0;
  margin: 2rem 0;
}

.features-list li {
  padding: 0.5rem 0;
  font-size: 1.1rem;
}

.demo-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.demo-links a {
  padding: 0.75rem 1.5rem;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.demo-links a:hover {
  background-color: #3aa876;
}
</style>