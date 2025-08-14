<script setup>
import ChildComponent from '../components/ChildComponent.vue'
import { ref } from 'vue'

const parentMessage = ref('这是来自父组件的消息')
const childData = ref('')
const otherMessage = ref('这是其他消息')

const handleChildEvent = (data) => {
  childData.value = data
}

const handleClick = () => {
  otherMessage.value = '这是新的其他消息'
}
</script>

<template>
  <div class="component-container">
    <h1>组件化开发演示</h1>
    <p>Vue 3支持组件化开发，允许我们构建可复用的UI组件。</p>

    <div class="parent-component">
      <h2>父组件</h2>
      <p>父组件消息: {{ parentMessage }}</p>
      <input v-model="parentMessage" placeholder="修改父组件消息">
      <p>子组件传递的数据: {{ childData }}</p>
      <p>其他消息: {{ otherMessage }}</p>
      <button @click="handleClick">修改其他消息</button>
    </div>

    <div class="child-component">
      <ChildComponent
        :parentMessage="parentMessage"
        :other="otherMessage"
        @child-event-send="handleChildEvent"
      />
    </div>
  </div>
</template>

<style scoped>
.component-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.parent-component,
.child-component {
  border: 1px solid #ddd;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
}

input {
  padding: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
</style>