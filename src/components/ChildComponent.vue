  <script setup> 
 import { ref } from 'vue' 
 const props = defineProps({ 
   parentMessage: String,
   other: String
 })

const emit = defineEmits(['child-event-send'])
const childMessage = ref('这是子组件的消息')

const sendToParent = () => {
  emit('child-event-send', childMessage.value)
}
</script>

<template>
  <div class="child-component-inner">
    <h3>子组件</h3>
    <p>从父组件接收的消息: {{ parentMessage }}</p>
    <p>从父组件接收的其他消息: {{ other }}</p>
    <input v-model="childMessage" placeholder="输入要发送给父组件的消息">
    <button @click="sendToParent">发送给父组件</button>
  </div>
</template>

<style scoped>
.child-component-inner {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
}

input {
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
  box-sizing: border-box;
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