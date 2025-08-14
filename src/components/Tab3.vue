<script setup>
import { ref } from 'vue'

// 接收父组件传递的props
const props = defineProps({
  message: String
})

// 定义发送给父组件的事件
const emit = defineEmits(['send-message'])

// 模拟数据加载延迟
const isLoading = ref(true)
const data = ref([])

// 模拟异步数据加载
setTimeout(() => {
  data.value = [
    { id: 1, name: '项目 A', status: '进行中' },
    { id: 2, name: '项目 B', status: '已完成' },
    { id: 3, name: '项目 C', status: '计划中' }
  ]
  isLoading.value = false
}, 1000)

// 发送消息给父组件
const sendMessage = () => {
  emit('send-message', `来自Tab3的消息: 共 ${data.value.length} 个项目`)
}
</script>

<template>
  <div class="tab3-content">
    <h2>标签页 3 内容 (异步加载)</h2>
    <p>这是通过异步方式导入的标签页。</p>
    <p>从父组件接收的消息: {{ message }}</p>

    <div class="data-section">
      <h3>项目列表</h3>
      <div v-if="isLoading" class="loading">加载中...</div>
      <table v-else>
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button @click="sendMessage" class="send-btn">发送消息给父组件</button>
  </div>
</template>

<style scoped>
.tab3-content {
  padding: 1rem;
}

.data-section {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

 table {
  width: 100%;
  border-collapse: collapse;
}

 th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

 th {
  background-color: #f2f2f2;
}

button.send-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.send-btn:hover {
  background-color: #e68a00;
}
</style>