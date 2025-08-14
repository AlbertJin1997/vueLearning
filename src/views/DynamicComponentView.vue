<script setup>
import { ref, defineAsyncComponent } from 'vue'

// 导入组件
import Tab1 from '../components/Tab1.vue'
import Tab2 from '../components/Tab2.vue'
// 异步导入组件
const Tab3 = defineAsyncComponent(() => import('../components/Tab3.vue'))

// 当前选中的标签
const currentTab = ref('tab1')
// 传递给子组件的数据
const message = ref('Hello from parent component!')
// 从子组件接收的消息
const receivedMessage = ref('')

// 处理子组件发送的事件
const handleMessage = (msg) => {
  receivedMessage.value = msg
}
</script>

<template>
  <div class="dynamic-component-container">
    <h1>Vue 3 动态组件演示</h1>
    <p>动态组件允许我们根据条件或用户交互动态切换不同的组件。</p>

    <div class="tabs">
      <button
        :class="{ active: currentTab === 'tab1' }"
        @click="currentTab = 'tab1'"
      >
        标签页 1
      </button>
      <button
        :class="{ active: currentTab === 'tab2' }"
        @click="currentTab = 'tab2'"
      >
        标签页 2
      </button>
      <button
        :class="{ active: currentTab === 'tab3' }"
        @click="currentTab = 'tab3'"
      >
        标签页 3 (异步)
      </button>
    </div>

    <div class="tab-content">
      <!-- 动态组件 -->
      <component
        :is="currentTab === 'tab1' ? Tab1 : currentTab === 'tab2' ? Tab2 : Tab3"
        :message="message"
        @send-message="handleMessage"
      ></component>
    </div>

    <div class="communication-section">
      <h2>组件通信</h2>
      <p>从父组件传递的消息: {{ message }}</p>
      <p>从子组件接收的消息: {{ receivedMessage }}</p>
      <div class="controls">
        <input
          type="text"
          v-model="message"
          placeholder="输入要发送给子组件的消息"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.dynamic-component-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tabs button {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
}

.tabs button.active {
  background-color: #646cff;
  color: white;
  border-bottom: 1px solid #646cff;
}

.tab-content {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 0 4px 4px 4px;
  min-height: 200px;
}

.communication-section {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.controls {
  margin-top: 1rem;
}

input[type="text"] {
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>