<script setup>
import { ref, onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount } from 'vue'

const count = ref(0)
const logMessages = ref([])

const addLog = (message) => {
  logMessages.value.push(`${new Date().toLocaleTimeString()}: ${message}`)
  // 只保留最近20条日志
  if (logMessages.value.length > 20) {
    logMessages.value.shift()
  }
}

onBeforeMount(() => {
  addLog('组件即将挂载 (onBeforeMount)')
})

onMounted(() => {
  addLog('组件已挂载 (onMounted)')
})

onBeforeUpdate(() => {
  addLog('组件即将更新 (onBeforeUpdate)')
})

onUpdated(() => {
  addLog('组件已更新 (onUpdated)')
})

onBeforeUnmount(() => {
  addLog('组件即将卸载 (onBeforeUnmount)')
})

onUnmounted(() => {
  addLog('组件已卸载 (onUnmounted)')
  console.log('组件已卸载，清理工作完成')
})
</script>

<template>
  <div class="lifecycle-container">
    <h1>Vue 3 生命周期钩子演示</h1>
    <p>Vue 3提供了一系列生命周期钩子函数，用于在组件不同阶段执行代码。</p>

    <div class="interactive-section">
      <h2>交互区域</h2>
      <p>点击按钮触发组件更新:</p>
      <button @click="count++">增加计数 ({{ count }})</button>
    </div>

    <div class="log-section">
      <h2>生命周期日志</h2>
      <div class="log-messages">
        <p v-for="(log, index) in logMessages" :key="index">{{ log }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lifecycle-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.interactive-section {
  border: 1px solid #ddd;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
}

.log-section {
  border: 1px solid #ddd;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.log-messages {
  font-family: monospace;
  white-space: pre-wrap;
}

.log-messages p {
  margin: 0.25rem 0;
  padding: 0.25rem;
  border-bottom: 1px solid #eee;
}

button {
  padding: 0.5rem 1rem;
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #535bf2;
}
</style>