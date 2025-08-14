<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="app-container">
    <header>
      <h1>Vue 3 学习Demo</h1>
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/components">组件</router-link>
        <router-link to="/composition-api">组合式API</router-link>
        <router-link to="/reactive">响应式</router-link>
        <router-link to="/pinia">状态管理</router-link>
        <router-link to="/lifecycle">生命周期</router-link>
        <router-link to="/directive">自定义指令</router-link>
        <router-link to="/dynamic-component">动态组件</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>© 2023 Vue 3 学习Demo</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #42b883;
  color: white;
  padding: 1rem;
  text-align: center;
}

nav {
  margin-top: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #3aa876;
}

main {
  flex: 1;
  padding: 2rem;
}

footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #ddd;
}
</style>
