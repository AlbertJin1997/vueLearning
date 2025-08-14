<script setup>
import { ref } from 'vue'

// 接收父组件传递的props
const props = defineProps({
  message: String
})

// 定义发送给父组件的事件
const emit = defineEmits(['send-message'])

// 子组件的状态
const counter = ref(0)

// 发送消息给父组件
const sendMessage = () => {
  emit('send-message', `来自Tab1的消息: 计数器值为 ${counter.value}`)
}
</script>

<template>
  <div class="tab1-content">
    <h2>标签页 1 内容</h2>
    <p>这是标签页1的静态内容。</p>
    <p>从父组件接收的消息: {{ message }}</p>

    <div class="counter-section">
      <p>计数器: {{ counter }}</p>
      <button @click="counter++">增加</button>
      <button @click="counter--">减少</button>
    </div>

    <button @click="sendMessage" class="send-btn">发送消息给父组件</button>
  </div>
</template>

<style scoped>
.tab1-content {
  padding: 1rem;
}

.counter-section {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #535bf2;
}

.send-btn {
  margin-top: 1rem;
  background-color: #4caf50;
}

.send-btn:hover {
  background-color: #45a049;
}
</style>