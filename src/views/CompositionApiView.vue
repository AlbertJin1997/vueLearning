<script setup>
import { ref, computed, watch, onMounted, onUnmounted, watchEffect } from 'vue'
import { useCounter } from '../composables/useCounter'

// 基础响应式数据
const count = ref(0)
const message = ref('Hello Vue 3')

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 监听
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

// 副作用
const stopWatchEffect = watchEffect(() => {
  console.log(`Current count: ${count.value}`)
})

// 生命周期钩子
onMounted(() => {
  console.log('Component mounted')
})

onUnmounted(() => {
  console.log('Component unmounted')
  stopWatchEffect()
})

// 自定义组合函数
const { counter, increment, decrement } = useCounter(10)
</script>

<template>
  <div class="composition-api-container">
    <h1>组合式API演示</h1>
    <p>Vue 3的组合式API提供了更灵活的方式来组织组件逻辑。</p>

    <div class="feature-section">
      <h2>基础响应式数据</h2>
      <p>Count: {{ count }}</p>
      <button @click="count++">增加</button>
      <button @click="count--">减少</button>
    </div>

    <div class="feature-section">
      <h2>计算属性</h2>
      <p>Double Count: {{ doubleCount }}</p>
    </div>

    <div class="feature-section">
      <h2>自定义组合函数</h2>
      <p>Counter from composable: {{ counter }}</p>
      <button @click="increment">增加</button>
      <button @click="decrement">减少</button>
    </div>

    <div class="feature-section">
      <h2>响应式消息</h2>
      <p>{{ message }}</p>
      <input v-model="message" placeholder="修改消息">
    </div>
  </div>
</template>

<style scoped>
.composition-api-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.feature-section {
  border: 1px solid #ddd;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
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

input {
  padding: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
</style>