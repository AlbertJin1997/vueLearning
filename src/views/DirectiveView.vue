<script setup>


// 自定义指令: 高亮元素
const highlight = directive({
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || '#f5f5f5'
    el.style.padding = '10px'
    el.style.borderRadius = '4px'
  },
  updated(el, binding) {
    el.style.backgroundColor = binding.value || '#f5f5f5'
  }
})

// 自定义指令: 防抖点击
const debounce = directive({
  mounted(el, binding) {
    let timer
    el.addEventListener('click', () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        binding.value()
      }, binding.arg || 500)
    })
  }
})

// 自定义指令: 权限控制
const permission = defineDirective({
  mounted(el, binding) {
    // 模拟权限检查
    const hasPermission = binding.value === 'admin'
    if (!hasPermission) {
      el.style.display = 'none'
    }
  }
})

const count = ref(0)
const bgColor = ref('#ffecb3')
const userRole = ref('user')

const incrementCount = () => {
  count.value++
  console.log('点击事件触发，计数:', count.value)
}
</script>

<template>
  <div class="directive-container">
    <h1>Vue 3 自定义指令演示</h1>
    <p>自定义指令允许我们直接操作DOM元素，扩展Vue的功能。</p>

    <div class="directive-section">
      <h2>1. v-highlight: 高亮元素</h2>
      <div v-highlight="bgColor">这是一个使用v-highlight指令高亮的元素</div>
      <div class="controls">
        <label for="bgColor">选择背景色:</label>
        <input type="color" id="bgColor" v-model="bgColor">
      </div>
    </div>

    <div class="directive-section">
      <h2>2. v-debounce: 防抖点击</h2>
      <p>快速点击按钮，只会触发一次计数增加（500ms防抖）</p>
      <button v-debounce:500="incrementCount">点击计数 ({{ count }})</button>
    </div>

    <div class="directive-section">
      <h2>3. v-permission: 权限控制</h2>
      <p>当前用户角色: {{ userRole }}</p>
      <button v-permission="userRole">管理员操作按钮</button>
      <p v-highlight="'#ffebee'" v-if="userRole !== 'admin'">提示: 只有管理员角色才能看到上面的按钮</p>
      <div class="controls">
        <label>切换用户角色:</label>
        <select v-model="userRole">
          <option value="user">普通用户</option>
          <option value="admin">管理员</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.directive-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.directive-section {
  border: 1px solid #ddd;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
}

.controls {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
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

select, input[type="color"] {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>