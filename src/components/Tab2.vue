<script setup>
import { ref } from 'vue'

// 接收父组件传递的props
const props = defineProps({
  message: String
})

// 定义发送给父组件的事件
const emit = defineEmits(['send-message'])

// 子组件的状态
const text = ref('')

// 发送消息给父组件
const sendMessage = () => {
  emit('send-message', `来自Tab2的消息: ${text.value || '无输入内容'}`)
}
</script>

<template>
  <div class="tab2-content">
    <h2>标签页 2 内容</h2>
    <p>这是标签页2的静态内容。</p>
    <p>从父组件接收的消息: {{ message }}</p>

    <div class="input-section">
      <label for="messageInput">输入消息:</label>
      <input
        type="text"
        id="messageInput"
        v-model="text"
        placeholder="输入要发送的消息"
      >
    </div>

    <button @click="sendMessage" class="send-btn">发送消息给父组件</button>
  </div>
</template>

<style scoped>
.tab2-content {
  padding: 1rem;
}

.input-section {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button.send-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.send-btn:hover {
  background-color: #0b7dda;
}
</style>