<script setup>
import { useCounterStore } from '../store'
import { storeToRefs } from 'pinia'

// 获取store实例
const counterStore = useCounterStore()

// 将store中的状态转换为响应式引用
const { count, name, doubleCount, getMessage } = storeToRefs(counterStore)

// 使用store中的action
const incrementCount = () => {
  counterStore.increment()
}

const decrementCount = () => {
  counterStore.decrement()
}

const resetCount = () => {
  counterStore.reset()
}

const incrementByFive = () => {
  counterStore.incrementBy(5)
}
</script>

<template>
  <div class="pinia-container">
    <h1>Pinia状态管理演示</h1>
    <p>Pinia是Vue 3的官方状态管理库，提供了更简洁、更高效的状态管理方案。</p>

    <div class="store-section">
      <h2>Store状态</h2>
      <p>名称: {{ name }}</p>
      <p>计数: {{ count }}</p>
      <p>双倍计数: {{ doubleCount }}</p>
      <p>消息: {{ getMessage }}</p>
    </div>

    <div class="actions-section">
      <h2>Store操作</h2>
      <button @click="incrementCount">增加1</button>
      <button @click="decrementCount">减少1</button>
      <button @click="resetCount">重置</button>
      <button @click="incrementByFive">增加5</button>
    </div>
  </div>
</template>

<style scoped>
.pinia-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.store-section,
.actions-section {
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
</style>